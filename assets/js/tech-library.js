const techLibrary = {
	"unity 3d": { image: "../images/skillset/unity_logo.png", name: "Unity 3D" },
	"unity": { image: "../images/skillset/unity_logo.png", name: "Unity 3D" },
	"unreal engine 5": { image: "../images/skillset/ue5_logo.png", name: "Unreal Engine 5" },
	"unreal engine": { image: "../images/skillset/ue5_logo.png", name: "Unreal Engine 5" },
	"ue5": { image: "../images/skillset/ue5_logo.png", name: "Unreal Engine 5" },
	"unreal engine 4": { image: "../images/skillset/ue4_logo.png", name: "Unreal Engine 4" },
	"ue4": { image: "../images/skillset/ue4_logo.png", name: "Unreal Engine 4" },
	"c++": { image: "../images/skillset/cpp_logo.png", name: "C++" },
	"cpp": { image: "../images/skillset/cpp_logo.png", name: "C++" },
	"c#": { image: "../images/skillset/csharp_logo.png", name: "C#" },
	"csharp": { image: "../images/skillset/csharp_logo.png", name: "C#" },
	"wwise": { image: "../images/skillset/wwise_logo.png", name: "Wwise" },
	"emscripten": { image: "../images/skillset/emscripten_logo.png", name: "emscripten" },
	"webgpu": { image: "../images/skillset/webgpu_logo.png", name: "WebGPU" },
	"opengl": { image: null, name: "OpenGL" },
	"blender": { image: "../images/skillset/blender_logo.png", name: "Blender" },
	"adobe illustrator": { image: null, name: "Adobe Illustrator" },
	"illustrator": { image: null, name: "Adobe Illustrator" },
	"photoshop": { image: "../images/skillset/photoshop_logo.png", name: "Adobe Photoshop" },
	"visual studio": { image: "../images/skillset/visualstudio_logo.png", name: "Visual Studio" },
	"visual studio code": { image: "../images/skillset/visualstudiocode_logo.png", name: "VS Code" },
	"vs code": { image: "../images/skillset/visualstudiocode_logo.png", name: "VS Code" },
	"cmake": { image: "../images/skillset/cmake_logo.png", name: "CMake" },
};

const techImageAlias = {
	"gameplay ability system": "unreal engine 5",
	"behaviour trees": "unreal engine 5",
	"niagara particle systems": "unreal engine 5",
	"blueprint": "unreal engine 5",
	"shader graph": "unity 3d",
	"finite state machines": "unity 3d",
	"utility based ai": "unity 3d",
};

function resolveTech(tech) {
	const key = tech.toLowerCase();
	if (techLibrary[key]) return techLibrary[key];
	if (techImageAlias[key]) return techLibrary[techImageAlias[key]];
	return null;
}

function renderTechnologies(techs, showName = true) {
	if (!techs || techs.length === 0) return "";
	
	const renderedImages = new Set();
	let html = '<div class="tech-grid">\n';
	
	for (const tech of techs) {
		const data = resolveTech(tech);
		if (!data) continue;
		
		if (data.image) {
			if (renderedImages.has(data.image)) continue;
			renderedImages.add(data.image);
			if (showName) {
				html += `<div class="tech-item">
	<img src="${data.image}" alt="${data.name}" />
	<span>${data.name}</span>
</div>\n`;
			} else {
				html += `<div class="tech-item">
	<img src="${data.image}" alt="${data.name}" />
</div>\n`;
			}
		} else {
			if (showName) {
				html += `<div class="tech-item">
	<span class="tech-text">${data.name}</span>
</div>\n`;
			}
		}
	}
	
	html += '</div>';
	return html;
}