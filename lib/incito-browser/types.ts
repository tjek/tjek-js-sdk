interface TjekOfferV1 {
    ids: {type: string; provider: string; value: string}[];
    title: string;
    description: string;
    quantity: string;
    products: {id: string; title: string; image: string}[];
    labels: any[];
    link: string;
}
export type Views =
    | FallbackView
    | View
    | TextView
    | AbsoluteLayout
    | FlexLayout
    | ImageView
    | VideoEmbedView
    | VideoView;
type Color = string;
type Unit = number | {[k: string]: unknown};

/**
 * Layout format
 */
export interface IIncito {
    /**
     * The identifier of the Incito used to future reference.
     */
    id: string;
    /**
     * The Incito specification version
     */
    version: '1.0.0';
    /**
     * The locale that defines the contents in `root_view` the best.
     */
    locale?: string;
    /**
     * An object that can contain any metadata for the Incito.
     */
    meta?: {
        author?: string;
        system?: string;
        build_time?: number;
        [k: string]: unknown;
    };
    /**
     * The main view entry point for the Incito.
     */
    root_view:
        | FallbackView
        | View
        | TextView
        | AbsoluteLayout
        | FlexLayout
        | ImageView
        | VideoEmbedView
        | VideoView;
    /**
     * External font assets loaded to be used in the Incito.
     */
    font_assets?: {
        [k: string]: {
            src: [
                (
                    | 'woff'
                    | 'woff2'
                    | 'truetype'
                    | 'svg'
                    | 'opentype'
                    | 'embedded-opentype'
                ),
                string
            ][];
            weight?: string;
            style?: string;
            [k: string]: unknown;
        };
    };
    /**
     * The overall theme of the Incito that all views inherit from.
     */
    theme?: {
        font_family?: [string, ...string[]];
        background_color?: Color;
        text_color?: Color;
        line_spacing_multiplier?: number;
        style?: string;
    };
    /**
     * Table of Contents
     */
    table_of_contents?: {title: string; view_id: string}[];
    [k: string]: unknown;
}
interface FallbackView {
    id?: string;
    role?: string;
    /**
     * Container for meta data
     */
    meta?: {
        ['tjek.offer.v1']?: TjekOfferV1;
        title?: string;
        [k: string]: unknown;
    };
    feature_labels?: string[];
    child_views?: Views[];
    background_color?: Color;
    background_image?: string;
    background_tile_mode?: 'repeat_x' | 'repeat_y' | 'repeat';
    background_image_position?:
        | 'left_top'
        | 'left_center'
        | 'left_bottom'
        | 'center_top'
        | 'center_center'
        | 'center_bottom'
        | 'right_top'
        | 'right_center'
        | 'right_bottom';
    background_image_scale_type?: 'center_crop' | 'center_inside';
    gravity?: 'center_horizontal' | 'left_horizontal' | 'right_horizontal';
    accessibility_label?: string;
    accessibility_hidden?: boolean;
    clip_children?: boolean;
    title?: string;
    link?: string;
    layout_width?: Unit;
    layout_height?: Unit;
    max_height?: Unit;
    max_width?: Unit;
    min_width?: Unit;
    min_height?: Unit;
    layout_left?: Unit;
    layout_top?: Unit;
    layout_bottom?: Unit;
    layout_margin?: Unit;
    layout_margin_left?: Unit;
    layout_margin_right?: Unit;
    layout_margin_bottom?: Unit;
    layout_margin_top?: Unit;
    padding?: Unit;
    padding_top?: Unit;
    padding_left?: Unit;
    padding_right?: Unit;
    padding_bottom?: Unit;
    layout_right?: Unit;
    transform_scale?: number;
    transform_translate_x?: Unit;
    transform_translate_y?: Unit;
    transform_rotate?: number;
    transform_origin?: [string, string];
    stroke_color?: Color;
    stroke_width?: Unit;
    stroke_style?: 'solid' | 'dotted' | 'dashed';
    stroke_top_width?: Unit;
    stroke_top_color?: Color;
    stroke_right_width?: Unit;
    stroke_right_color?: Color;
    stroke_bottom_width?: Unit;
    stroke_bottom_color?: Color;
    stroke_left_width?: Unit;
    stroke_left_color?: Color;
    corner_radius?: Unit;
    corner_top_right_radius?: Unit;
    corner_top_left_radius?: Unit;
    corner_bottom_right_radius?: Unit;
    corner_bottom_left_radius?: Unit;
    shadow_color?: Color;
    shadow_dx?: number;
    shadow_dy?: number;
    shadow_radius?: number;
    layout_flex_shrink?: number;
    layout_flex_grow?: number;
    layout_flex_basis?: Unit;
    [k: string]: unknown;
}
interface View extends FallbackView {
    view_name: 'View';
}
export interface TextView extends FallbackView {
    view_name: 'TextView';
    text_all_caps?: boolean;
    font_family?: [string, ...string[]];
    text: string;
    text_color?: Color;
    text_alignment?: string;
    text_size?: number;
    text_style?: 'bold' | 'italic' | 'bold|italic';
    text_decoration_line?: ('overline' | 'line-through' | 'underline')[];
    text_shadow?: string;
    text_prevent_widow?: boolean;
    line_spacing_multiplier?: string | number;
    spans?: {
        start?: number;
        end?: number;
        name?: 'superscript' | 'link';
        url?: string;
        style?: 'bold' | 'italic';
        [k: string]: unknown;
    }[];
    max_lines?: number;
}
interface AbsoluteLayout extends FallbackView {
    view_name: 'AbsoluteLayout';
}
interface FlexLayout extends FallbackView {
    view_name: 'FlexLayout';
    layout_flex_align_items?:
        | 'stretch'
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'baseline';
    layout_flex_justify_content?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around';
    layout_flex_direction?: 'row' | 'column';
}
export interface ImageView extends FallbackView {
    view_name: 'ImageView';
    /**
     * The URL to the source image
     */
    src: string;
    /**
     * The caption describing the image
     */
    label?: string;
}
export interface VideoEmbedView extends FallbackView {
    view_name: 'VideoEmbedView';
    /**
     * The URL to the source video
     */
    src: string;
}
export interface VideoView extends FallbackView {
    view_name: 'VideoView';
    /**
     * The URL to the source video
     */
    src: string;
    autoplay?: boolean;
    loop?: boolean;
    controls?: boolean;
    mime: string;
}
