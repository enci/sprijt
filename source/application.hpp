#pragma once

#include <SDL3/SDL.h>
#include <string>

#include <imgui.h>
#include <imgui_node_editor.h>
#include "nodes/node_colors.hpp"
#include "nodes/node_graph.hpp"

class application {
public:
    application(const std::string& title, int width, int height);
    ~application();

    void run();

    // Thread-safe: pushes a custom SDL event to wake the main loop.
    // Call from any worker thread when results are ready to display.
    static void request_redraw();

private:
    void init_sdl();
    void init_imgui();
    void init_node_editor();
    void process_events();
    void dispatch_event(const SDL_Event& event);
    void update();
    void render();
    void cleanup();
    void node_editor();
    void side_panel();
    void toolbar();
    void context_menu();

    void set_light_theme();
    void set_dark_theme();
    void set_node_editor_style();
    void apply_theme();

    // Helpers
    ImVec4 wire_color(pin_data_type type) const;
    ImVec4 header_color(node_category cat) const;

    SDL_Window* m_window;
    SDL_Renderer* m_renderer;
    SDL_Event m_event;

    bool m_running;
    std::string m_title;
    int m_width;
    int m_height;
    float m_resolution_scale;
    float m_ui_scale;

    bool m_dark_theme = true;
    bool m_show_demo_window = false;
    int m_redraw_frames = 0;           // extra frames to render after activity
    static constexpr int k_cooldown_frames = 3;  // frames to keep rendering after last event
    static Uint32 s_redraw_event_type; // custom SDL event for cross-thread wake-up

    ImVec4 m_colors[editor::Color_COUNT];

    ax::NodeEditor::EditorContext* m_node_editor_context;
    bool m_first_frame = true;
    node_graph m_graph;
    int m_selected_node_id = 0;
};
