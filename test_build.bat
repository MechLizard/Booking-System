@echo off
g++ -Wall -Wextra -Wuninitialized -Wpedantic -Werror -g src/*.cpp test/*.cpp test/catch/*.cpp -o app