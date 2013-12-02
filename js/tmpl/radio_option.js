{% log(o); %}
<!-- <fieldset> -->

    <p>{%=o.p%}<p>
    <ul>
    {% var set = ['fourDir', 'twoDir', 'noDir']; %}
    {% for(var x in set) { %}
        {% var key = set[x]; %}
        {% if(o[key]) { %}
        <li class="rad_item">
            <label>{%=o[key].title%}</label>
            <input class="rad_action" id="{%=o.prefix%}_{%=key%}" name="selected_mode" type="radio">
            </input>
        </li>
        {% } %}
    {% } %}
    </ul>

<!-- </fieldset> -->