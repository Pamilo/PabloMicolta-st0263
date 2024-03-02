// encargado de mantener la lista de los archivos disponibles
#include <iostream>
#include <filesystem>
#include <vector>
#include <string>
#include "json.hpp" 
namespace fs = std::filesystem;
using json = nlohmann::json;

int main(){
    std::vector<std::string> files;
    std::string folder_path = "files"; // Replace this with the path to your folder
    for (const auto& entry : fs::directory_iterator(folder_path)) {
        files.push_back(entry.path().filename().string());
    }

    json json_array = json::array();
    for (const auto& file : files) {
        json_array.push_back(file);
    }

    // Serialize the JSON array to a string
    std::cout<<json_array;

    return 0;
}