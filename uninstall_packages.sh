#!/bin/bash

# Initialize an empty array to hold the folder names
chapter_folders=()

# Populate the array with the folder names sorted
for folder in chapter_*; do
    if [[ -d "$folder" ]]; then
        chapter_folders+=("$folder")
    fi
done

# Sort the folders
IFS=$'\n' sorted_folders=($(sort <<<"${chapter_folders[*]}"))
unset IFS

# Remove the last folder from the array, so we don't delete its node_modules
sorted_folders=("${sorted_folders[@]:0:${#sorted_folders[@]}-1}")

# Loop through each folder and delete node_modules
for folder in "${sorted_folders[@]}"; do
    echo "Removing node_modules from $folder"
    rm -rf "$folder/node_modules"
done

echo "Removal complete for all folders except the last one."
