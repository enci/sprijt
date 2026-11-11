#include "load_image_node.hpp"
#include "node_graph.hpp"

#include <imgui.h>
#include "stb_image.h"

REGISTER_NODE(load_image_node)

void load_image_node::execute(node_graph& /*graph*/) {
    if (m_path.empty()) {
        set_output(0, std::monostate{});
        return;
    }

    int w, h, ch;
    unsigned char* pixels = stbi_load(m_path.c_str(), &w, &h, &ch, 4); // force RGBA
    if (pixels) {
        sprijt::image img(pixels, w, h, 4);
        stbi_image_free(pixels);
        set_output(0, std::move(img));
    } else {
        set_output(0, std::monostate{});
    }
}

void load_image_node::draw_properties() {
    ImGui::TextUnformatted("Load Image");
    ImGui::Separator();

    char buf[512];
    snprintf(buf, sizeof(buf), "%s", m_path.c_str());
    if (ImGui::InputText("Path", buf, sizeof(buf))) {
        m_path = buf;
        mark_dirty();
    }

    // Show image info if we have a valid output
    const auto& val = output_value(0);
    if (auto* img = std::get_if<sprijt::image>(&val)) {
        if (*img) {
            ImGui::Text("Size: %d x %d", img->width(), img->height());
        }
    }
}
