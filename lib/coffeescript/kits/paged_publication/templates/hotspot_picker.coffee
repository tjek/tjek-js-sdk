module.exports = """
    <div class="sgn__popover">
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
