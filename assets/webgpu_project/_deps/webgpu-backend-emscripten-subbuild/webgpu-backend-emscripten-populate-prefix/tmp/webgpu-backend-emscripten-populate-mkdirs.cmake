# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "C:/Users/marcv/source/webgpu/myWebGPU-cpp-setup/build-web/_deps/webgpu-backend-emscripten-src"
  "C:/Users/marcv/source/webgpu/myWebGPU-cpp-setup/build-web/_deps/webgpu-backend-emscripten-build"
  "C:/Users/marcv/source/webgpu/myWebGPU-cpp-setup/build-web/_deps/webgpu-backend-emscripten-subbuild/webgpu-backend-emscripten-populate-prefix"
  "C:/Users/marcv/source/webgpu/myWebGPU-cpp-setup/build-web/_deps/webgpu-backend-emscripten-subbuild/webgpu-backend-emscripten-populate-prefix/tmp"
  "C:/Users/marcv/source/webgpu/myWebGPU-cpp-setup/build-web/_deps/webgpu-backend-emscripten-subbuild/webgpu-backend-emscripten-populate-prefix/src/webgpu-backend-emscripten-populate-stamp"
  "C:/Users/marcv/source/webgpu/myWebGPU-cpp-setup/build-web/_deps/webgpu-backend-emscripten-subbuild/webgpu-backend-emscripten-populate-prefix/src"
  "C:/Users/marcv/source/webgpu/myWebGPU-cpp-setup/build-web/_deps/webgpu-backend-emscripten-subbuild/webgpu-backend-emscripten-populate-prefix/src/webgpu-backend-emscripten-populate-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "C:/Users/marcv/source/webgpu/myWebGPU-cpp-setup/build-web/_deps/webgpu-backend-emscripten-subbuild/webgpu-backend-emscripten-populate-prefix/src/webgpu-backend-emscripten-populate-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "C:/Users/marcv/source/webgpu/myWebGPU-cpp-setup/build-web/_deps/webgpu-backend-emscripten-subbuild/webgpu-backend-emscripten-populate-prefix/src/webgpu-backend-emscripten-populate-stamp${cfgdir}") # cfgdir has leading slash
endif()
