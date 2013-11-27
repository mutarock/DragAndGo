{% log(o); %}
<fieldset>
    <legend>{%=o.legend%}</legend>
    <ul>
    {% var set = ['up', 'down', 'right', 'left']; %}
    {% for(var x in set) { %}
        {% var key = set[x]; %}
        {% if(o[key]) { %}
        <li class="o_item">
            <label>{%=o[key].title%}</label>
            <select class="opt_action">
            {% for(var i in o[key].option) { %}
                <option value="{%=o[key].option[i]['value']%}">{%=o[key].option[i]['title']%}</option>
            {% } %}
            </select>
        </li>
        {% } %}
    {% } %}
    </ul>
</fieldset>