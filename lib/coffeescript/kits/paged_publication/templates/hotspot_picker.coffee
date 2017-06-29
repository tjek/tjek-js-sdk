module.exports = """
<div class="sgn-pp-hotspot-picker__background" data-close></div>
<div class="sgn__popover" style="top: {{top}}px; left: {{left}}px;">
    {{#header}}
        <div class="sgn-popover__header">{{header}}</div>
    {{/header}}
    <div class="sgn-popover__content">
        <ul>
            {{#hotspots}}
                <li data-id="{{id}}">
                    <p>{{title}}</p>
                    <p>{{subtitle}}</p>
                </li>
            {{/hotspots}}
        </ul>
    </div>
</div>
"""
