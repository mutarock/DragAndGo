{% log(o); %}
<!-- <fieldset> -->
    <!-- <legend>{%=o.legend%}</legend>  -->
    <h4>{%=o.header%}</h4>
    <ul>
    {% var set = ['up', 'down', 'right', 'left']; %}
    {% for(var x in set) { %}
        {% var key = set[x]; %}
        {% if(o[key]) { %}
        <li class="o_item">
            <label>{%=o[key].title%}</label>
            <select class="opt_action" id="{%=o.prefix%}_{%=key%}">
            {% for(var i in o[key].option) { %}
                <option value="{%=o[key].option[i]['value']%}">{%=o[key].option[i]['title']%}</option>
            {% } %}
            </select>
            
            {% if(o[key].engine_title) { %}
                <label class="lb_engine">{%=o[key].engine_title%}</label>
            {% } %}
            {% if(o[key].engine_option) { %}
                <select class="opt_engine_action" id="{%=o.prefix%}_{%=key%}_engine">
                {% for(var i in o[key].engine_option) { %}
                    <option value="{%=o[key].engine_option[i]['value']%}">{%=o[key].engine_option[i]['title']%}</option>
                {% } %}
                </select>
            {% } %}
        </li>
        {% } %}
    {% } %}
    </ul>
<!-- </fieldset> -->