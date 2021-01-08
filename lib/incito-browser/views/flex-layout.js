import './flex-layout.styl';
import View from './view';

const alignItemModes = [
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'baseline'
];
const flexJustifyModes = [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around'
];
const flexDirectionModes = ['row', 'column'];

class FlexLayout extends View {
    className = 'incito__flex-layout-view';
    render() {
        if (alignItemModes.indexOf(this.attrs.layout_flex_align_items) !== -1) {
            this.el.style.alignItems = this.attrs.layout_flex_align_items;
            this.el.style.msAlignItems = this.attrs.layout_flex_align_items;
        }

        if (
            flexJustifyModes.indexOf(this.attrs.layout_flex_justify_content) !==
            -1
        ) {
            this.el.style.justifyContent = this.attrs.layout_flex_justify_content;
            this.el.style.msFlexPack = this.attrs.layout_flex_justify_content;
        }

        if (
            flexDirectionModes.indexOf(this.attrs.layout_flex_direction) !== -1
        ) {
            this.el.style.flexDirection = this.attrs.layout_flex_direction;
            this.el.style.msFlexDirection = this.attrs.layout_flex_direction;
        }

        return this;
    }
}

export default FlexLayout;
