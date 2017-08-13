module.exports = """
<div class="sgn__pp" style="height: 100%;">
    <div class="verso">
        <div class="verso__scroller">
            <div class="sgn-pp__pages"></div>
        </div>
    </div>

    {{#showProgressBar}}
        <div class="sgn-pp__progress">
            <div class="sgn-pp-progress__bar"></div>
        </div>
    {{/showProgressBar}}

    {{#showProgressLabel}}
        <div class="sgn-pp__progress-label"></div>
    {{/showProgressLabel}}

    {{#showControls}}
        <a class="sgn-pp__control" href="#" role="button" data-direction="prev">&lsaquo;</a>
        <a class="sgn-pp__control" href="#" role="button" data-direction="next">&rsaquo;</a>
    {{/showControls}}
</div>
"""
