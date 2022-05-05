const nr_of_particles = 1000;
const particles = [];
const field = [];
const size = 20;
const yellow = 'aqua';

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	for (let x = 0; x < nr_of_particles; x++) {
		particles.push(new Particle());
	}

	createField();
	background(yellow);

	drawText();
}

function draw() {
	particles.forEach(particle => {
		particle.update();
		particle.draw();
		particle.setForceFromField(field);
	});

	if (frameCount % 10 === 0) {
		drawText();
	}
}

function drawText() {
	fill('rgba(255,255,255, 0.1)');
	strokeWeight(0);
	textSize(width / 25);
	textAlign(CENTER);
	textFont('Lora');
	text('MMTR #frontend', width / 2, height / 2);
}

class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.prevPos = this.pos.copy();
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxSpeed = 4;
	}

	applyForce(force) {
		this.acc.add(force);
	}

	update() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.prevPos = this.pos.copy();
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.checkEdges();
	}

	draw() {
		stroke(random() < 0.5 ? yellow : 'black');
		// stroke();
		strokeWeight(0.5);
		line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
	}

	checkEdges() {
		if (this.pos.x > width) {
			this.pos.x = 0;
			this.prevPos = this.pos.copy();
		}
		if (this.pos.x < 0) {
			this.pos.x = width;
			this.prevPos = this.pos.copy();
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
			this.prevPos = this.pos.copy();
		}
		if (this.pos.y < 0) {
			this.pos.y = height;
			this.prevPos = this.pos.copy();
		}
	}

	setForceFromField(field) {
		const x = Math.floor(this.pos.x / size);
		const y = Math.floor(this.pos.y / size);
		const idx = y + x * size;
		const force = field[idx];
		this.applyForce(force);
	}
}

function createField() {
	const rows = Math.floor(width / size);
	const cols = Math.floor(height / size);
	let x_noise = 0;
	for (let i = 0; i < rows; i++) {
		let y_noise = 0;
		for (let j = 0; j < cols; j++) {
			const angle = noise(x_noise, y_noise) * TWO_PI * 10;
			const vec = p5.Vector.fromAngle(angle);
			vec.setMag(0.3);
			field.push(vec);
			y_noise += 0.1;
		}
		x_noise += 0.1;
	}
}

