cmake_minimum_required(VERSION 3.28)
project(The_Feed)

set(CMAKE_CXX_STANDARD 14)

include_directories(.)
include_directories(.circleci)
include_directories(src)

add_executable(The_Feed
        .circleci/config.yml
        src/main.cpp
        .gitignore
        build.bat
        build.sh
        README.md
        src/Account.cpp)
