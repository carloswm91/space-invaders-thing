var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;

var shots = [];

var follower = {
    x: Math.random()*500,
    y: 0,
    width: 20, 
    height: 20,
    update: function() {
        if (this.x+this.width/2 < ship.x+ship.width/6)  //IMAGEIO SLOP
        {
            this.x+=1;
        }
        else if (this.x > ship.x)
        {
            this.x-=1;
        }
        this.y+=1;
    },
    render: function() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    hide: function() {            // QUICK FIX
        this.x = -30;
        this.y = 500;
    }
}

function Shot()
{
    this.x= ship.x + ship.width/6;  //IMAGE IO SLOP
    this.y= ship.y;
    this.width = 5;
    this.height = 20 ;
    this.firing = true;
    this.render = function() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.isAHit = function() {
        console.log('entered isAHit ')
        if (this.x >= follower.x)
        {
            console.log('level 1');
            if (this.x <=follower.x + follower.width)
            {
                console.log('level 2');
                if (this.y <= follower.y +follower.height)
                {
                    console.log('level 3');    
                    if (this.y >= follower.y)
                    {
                        console.log('level 4');
                        return true;
                    }
                }
            }
            return false;
        }
    }
}

var toRadians = function(num) {
    return (num*(Math.PI/180));
}

window.addEventListener("keydown", function(e) {

    console.log(e.keyCode);

    switch(e.keyCode)
    {
        case 65: ship.x-=20; break; // A
        case 68: ship.x+=20; break; // D
        case 32: ship.shoot(); break; // SPACE
    }
}, false);

var background = {
    src: "background.png",
    render: function() {
        var img = new Image();
        img.src =this.src;
        ctx.drawImage(img, 0,0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    }
}
var ship = {
    x: canvas.width/2,
    y: 3*canvas.height/4,
    width: 173,
    height: 291,
    angle_from_x_axis: 0,
    src: "ship.png",
    shoot: function() {
        shots.push(new Shot());
    },
    update: function() {
        
    },
    render: function() {
        var img = new Image();
        img.src=this.src;
        ctx.drawImage(img, 0, 0, this.width, this.height, this.x, this.y, this.width/3, this.height/3 );
    }
}
var update = function() {
    follower.update();
    for (var i in shots)
    {
        if (shots[i].firing)
        {
            shots[i].y-=20;
        }
    }
}
var render = function() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    background.render();
    ship.render();
    for (var i in shots) 
    {  
        shots[i].render();

            if (shots[i].isAHit() )
            {
                follower.hide();    // QUICK FIX SLOP
            }
        
    }
    follower.render();
}
var main = function() {
    update();
    render();

    requestAnimationFrame(main);
}
main();
