var state = {
    character: 'Elisha'
};

$(document).ready(function() {
    $('#bg1')[0].play();
    
    $('#landing-page').show();
    $('#prompt-page').hide();
    $('#game-page').hide();
    
    // $('#landing-page').hide();
    // $('#prompt-page').show();
    // $('#game-page').hide();
    
    // $('#landing-page').hide();
    // $('#prompt-page').hide();
    // $('#game-page').show();
    
    $('#landing-play-button').on('click', function(e) {
        e.preventDefault();
        
        $('#landing-page').hide();
        $('#prompt-page').show();
        $('#game-page').hide();
    });
    
    $('#prompt-elisha-wrapper').on('click', function(e) {
        e.preventDefault();
        
        $('#bg1')[0].pause();
        $('#bg2')[0].play();
        
        $('#landing-page').hide();
        $('#prompt-page').hide();
        $('#game-page').show();
        
        state.character = 'Leah';
        
        updateCharacter();
    });
    
    $('#prompt-leah-wrapper').on('click', function(e) {
        e.preventDefault();
        
        $('#bg1')[0].pause();
        $('#bg2')[0].play();
        
        $('#landing-page').hide();
        $('#prompt-page').hide();
        $('#game-page').show();
        
        state.character = 'Elisha';
        
        updateCharacter();
    });
    
    $('#game-switch').on('click', function(e, el) {
        e.preventDefault();
        
        updateCharacter();
    });
    
    function updateCharacter() {
        if(state.character === 'Leah') {
            $('#game-character').attr('alt', 'Elisha');
            $('#game-character').attr('src', '/assets/game-elisha.png');
            $('#game-switch').attr('alt', 'Leah');
            state.character = 'Elisha';
        }
        else if(state.character === 'Elisha') {
            $('#game-character').attr('alt', 'Leah');
            $('#game-character').attr('src', '/assets/game-leah.png');
            $('#game-switch').attr('alt', 'Elisha');
            state.character = 'Leah';
        }
    }
    
    interact('.wearable').draggable({
        // keep the element within the area of it's parent
        restrict: {
            restriction: $('#main-wrapper')[0],
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener
    })
    .resizable({
        preserveAspectRatio: true,
        edges: { left: true, right: true, bottom: true, top: true }
    })
    .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
    });

    function dragMoveListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
});