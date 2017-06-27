module.exports = """
    <div class="sgn__popover">
        {{#header}}
            <div class="sgn-popover__header">{{header}}</div>
        {{/header}}
        <div class="sgn-popover__content">
            <ul>
                {{#hotspots}}
                    <li>
                        <p>
                            <a href="#" data-id="{{id}}">{{title}}</a>
                        </p>
                        <p>{{subtitle}}</p>
                    </li>
                {{/hotspots}}
            </ul>
        </div>
    </div>
"""
