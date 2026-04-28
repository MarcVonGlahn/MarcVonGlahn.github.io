/**
 * ue5-highlight.js
 *
 * Post-processes highlight.js output on language-cpp code blocks to add
 * UE5-specific syntax coloring that highlight.js does not handle natively:
 *
 *  - UE5 macros  (UCLASS, UPROPERTY, UFUNCTION, etc.)  → .hljs-ue5-macro  (grey  #9b9b9b)
 *  - T-prefixed template types  (TArray, TMap, etc.)   → .hljs-ue5-type   (teal  #4ec9b0)
 *  - F-prefixed structs  (FName, FString, FVector, …)  → .hljs-ue5-type
 *  - U-prefixed classes  (UObject, UClass, …)          → .hljs-ue5-type
 *  - A-prefixed actors   (AActor, ACharacter, …)        → .hljs-ue5-type
 *
 * The script works by walking every text node inside a highlighted cpp block
 * and splitting/wrapping matches. It deliberately avoids touching nodes that
 * are already inside an existing <span> (i.e. already coloured by hljs) so it
 * never double-wraps or corrupts existing tokens.
 *
 * Must be loaded AFTER hljs.highlightAll() has run.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------------------ */
    /*  Token lists                                                         */
    /* ------------------------------------------------------------------ */

    // UE5 reflection / utility macros
    const UE5_MACROS = [
        'UCLASS', 'USTRUCT', 'UENUM', 'UINTERFACE',
        'UPROPERTY', 'UFUNCTION', 'UPARAM', 'UMETA',
        'GENERATED_BODY', 'GENERATED_UCLASS_BODY', 'GENERATED_USTRUCT_BODY',
        'DECLARE_DYNAMIC_MULTICAST_DELEGATE',
        'DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam',
        'DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams',
        'DECLARE_DYNAMIC_DELEGATE',
        'DECLARE_DELEGATE',
        'DECLARE_EVENT',
        'UE_LOG',
        'check', 'checkf', 'ensure', 'ensureMsgf',
        'TEXT', 'LOCTEXT', 'NSLOCTEXT',
        'INDEX_NONE',
        'HasAuthority',
    ];

    // T-prefixed Unreal template types
    const UE5_T_TYPES = [
        'TArray', 'TMap', 'TSet', 'TMultiMap',
        'TSubclassOf', 'TWeakObjectPtr', 'TStrongObjectPtr',
        'TSharedPtr', 'TSharedRef', 'TUniquePtr',
        'TFunction', 'TOptional', 'TVariant',
        'TEnumAsByte', 'TSubobjectPtr',
        'TObjectPtr', 'TObjectIterator',
        'TActorIterator', 'TFieldIterator',
        'TRange', 'TInterval',
    ];

    // Commonly used F-prefixed struct/value types
    const UE5_F_TYPES = [
        'FName', 'FString', 'FText',
        'FVector', 'FVector2D', 'FVector4',
        'FRotator', 'FQuat', 'FTransform',
        'FColor', 'FLinearColor',
        'FHitResult', 'FCollisionQueryParams',
        'FTimerHandle', 'FTimerDelegate',
        'FLatentActionInfo',
        'FGameplayTag', 'FGameplayTagContainer',
        'FGameplayAttribute', 'FGameplayEffectSpec',
        'FGameplayEffectContextHandle', 'FGameplayEventData',
        'FGameplayAbilitySpec', 'FGameplayAbilitySpecHandle',
        'FActiveGameplayEffectHandle',
        'FOnManagerRegistered',
        'FInputActionValue',
        'FActorSpawnParameters',
        'FAttachmentTransformRules', 'FDetachmentTransformRules',
        'FObjectInitializer',
        'FMath',
        'FPlatformMisc',
        'FDateTime', 'FTimespan',
        'FGuid',
        'FSoftObjectPath', 'FSoftClassPath',
        'FStreamableHandle',
        'FDelegateHandle',
    ];

    // Commonly used U-prefixed class types
    const UE5_U_TYPES = [
        'UObject', 'UClass', 'UWorld', 'ULevel',
        'UGameInstance', 'UGameInstanceSubsystem',
        'UWorldSubsystem', 'UEngineSubsystem',
        'UActorComponent', 'USceneComponent',
        'UStaticMeshComponent', 'USkeletalMeshComponent',
        'UCapsuleComponent', 'USphereComponent', 'UBoxComponent',
        'UCharacterMovementComponent', 'UProjectileMovementComponent',
        'UInputComponent',
        'UMaterial', 'UMaterialInstance', 'UMaterialInstanceDynamic',
        'UTexture', 'UTexture2D',
        'UStaticMesh', 'USkeletalMesh',
        'UAnimInstance', 'UAnimMontage',
        'USoundBase', 'USoundCue', 'USoundWave',
        'UParticleSystem', 'UNiagaraSystem',
        'UDataTable', 'UDataAsset', 'UPrimaryDataAsset',
        'UAbilitySystemComponent', 'UAbilitySystemGlobals',
        'UGameplayAbility', 'UGameplayEffect', 'UGameplayTask',
        'UAttributeSet',
        'UNavigationSystemV1', 'UPathFollowingComponent',
        'UBehaviorTree', 'UBehaviorTreeComponent', 'UBlackboardComponent',
        'UBTTaskNode', 'UBTDecoratorNode', 'UBTServiceNode',
        'UUserWidget', 'UWidgetComponent',
        'UEnhancedInputComponent', 'UInputAction', 'UInputMappingContext',
        'UStreamableManager',
        'UKismetMathLibrary', 'UKismetSystemLibrary', 'UKismetStringLibrary',
        'UGameplayStatics', 'UWorldPartitionSubsystem',
    ];

    // Commonly used A-prefixed actor types
    const UE5_A_TYPES = [
        'AActor', 'ACharacter', 'APawn', 'AController',
        'APlayerController', 'AAIController',
        'AGameModeBase', 'AGameMode',
        'AGameStateBase', 'AGameState',
        'APlayerState',
        'AInfo', 'AWorldSettings',
        'AStaticMeshActor', 'ASkeletalMeshActor',
        'ABrush', 'AVolume',
        'ACameraActor', 'APlayerCameraManager',
        'ALightActor', 'ADirectionalLight', 'APointLight', 'ASpotLight',
        'APlayerStart', 'ANavigationData',
        'AAbstracticaCharacter',  // project-specific
    ];

    /* ------------------------------------------------------------------ */
    /*  Build regex patterns                                                */
    /* ------------------------------------------------------------------ */

    // Sort longest-first to avoid partial matches (e.g. TMap before TMultiMap)
    function buildPattern(tokens) {
        const sorted = tokens.slice().sort((a, b) => b.length - a.length);
        return sorted.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    }

    // Pattern for explicit named tokens — word-boundary aware
    const macroPattern  = new RegExp(`\\b(${buildPattern(UE5_MACROS)})\\b`, 'g');
    const namedTypes    = [...UE5_T_TYPES, ...UE5_F_TYPES, ...UE5_U_TYPES, ...UE5_A_TYPES];
    const namedPattern  = new RegExp(`\\b(${buildPattern(namedTypes)})\\b`, 'g');

    // Generic catch-all patterns for UE5 naming conventions (anything not already
    // in the named lists).  Applied AFTER named types so the span is already in place
    // for known types; these only catch unknown/user-defined names.
    //
    //   U[A-Z]\w*  — UObject-derived classes
    //   A[A-Z]\w*  — AActor-derived classes
    //   F[A-Z]\w*  — FStruct value types
    //   T[A-Z]\w*  — Template types
    //
    // These patterns are intentionally conservative: they require a capital second
    // letter to avoid false-positives (e.g. "for", "false", "find").
    const genericUETypePattern = /\b([UAFT][A-Z]\w*)\b/g;

    /* ------------------------------------------------------------------ */
    /*  DOM helpers                                                         */
    /* ------------------------------------------------------------------ */

    /**
     * Wrap all regex matches in a text node with <span class="cls">.
     * Returns an array of new nodes (may be text + span + text fragments).
     * Returns null if no match found (caller keeps the original node).
     */
    function wrapTextNode(textNode, regex, cls) {
        const text = textNode.nodeValue;
        regex.lastIndex = 0;
        const fragments = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                fragments.push(document.createTextNode(text.slice(lastIndex, match.index)));
            }
            const span = document.createElement('span');
            span.className = cls;
            span.textContent = match[0];
            fragments.push(span);
            lastIndex = regex.lastIndex;
        }

        if (fragments.length === 0) return null;

        if (lastIndex < text.length) {
            fragments.push(document.createTextNode(text.slice(lastIndex)));
        }
        return fragments;
    }

    /**
     * Replace a text node in-place with an array of nodes.
     */
    function replaceTextNode(textNode, replacements) {
        const parent = textNode.parentNode;
        replacements.forEach(node => parent.insertBefore(node, textNode));
        parent.removeChild(textNode);
    }

    /**
     * Walk all TEXT_NODE descendants of `root` that are direct children of
     * the root itself (i.e. not already inside a <span> added by hljs).
     * We only process top-level text nodes to avoid breaking hljs spans.
     */
    function processTopLevelTextNodes(root, regex, cls) {
        // Collect first — do not mutate while iterating
        const textNodes = [];
        root.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                textNodes.push(node);
            }
        });
        textNodes.forEach(tn => {
            const replacements = wrapTextNode(tn, regex, cls);
            if (replacements) replaceTextNode(tn, replacements);
        });
    }

    /* ------------------------------------------------------------------ */
    /*  Main processing                                                     */
    /* ------------------------------------------------------------------ */

    function processCodeBlocks() {
        // Target only cpp blocks that hljs has already processed
        const blocks = document.querySelectorAll('pre code.language-cpp.hljs, pre code.hljs.language-cpp');

        blocks.forEach(block => {
            // Step 1 — wrap named macros in top-level text nodes
            processTopLevelTextNodes(block, macroPattern,  'hljs-ue5-macro');

            // Step 2 — wrap named types in top-level text nodes
            processTopLevelTextNodes(block, namedPattern,  'hljs-ue5-type');

            // Step 3 — generic UE5 naming convention catch-all (top-level text only)
            processTopLevelTextNodes(block, genericUETypePattern, 'hljs-ue5-type');
        });
    }

    // Run after the DOM is ready.  If this script is deferred / placed after
    // hljs.highlightAll() the DOM is already available; guard just in case.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', processCodeBlocks);
    } else {
        processCodeBlocks();
    }
}());
