{% log(o); %}
<!-- <fieldset> -->
    <p>{%=o.p%}</p>
    <ul>
    {% var set = ['fourDir', 'twoDir', 'noDir']; %}
    {% var index = 0; %}
    {% for(var x in set) { %}
        {% var key = set[x]; %}
        {% if(o[key]) { %}
        <li class="rad_item">
            <label class="rad_label">{%=o[key].title%}</label>
            <!-- <div style="background: url('..../image/"+key+".ico) no-repeat;"></div> -->
            <input class="rad_action" id="{%=o.prefix%}_radio_{%=index%}" name="{%=o.prefix%}_selected_mode" type="radio" value="{%=o[key].option[index]['value']%}">
            </input>
        </li>
        {% } %}
        {% index+=1; %}
    {% } %}
    </ul>

<!-- </fieldset> -->