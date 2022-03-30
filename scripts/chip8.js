/**
 * - Reunites all subscripts in a main file and runs the emulation.
 * 	renderer.js will declare canvas drawing functions/methods.
 * 	keyboard.js will read keyboard events and translate to operations.
 * 	speaker.js will declare sound operations according to its frequency.
 * 	cpu.js is problably the most important, translates rom's operations the cpu execution stack.
 */

import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';
import CPU from './cpu.js';

const renderer = new Renderer(10);
const keyboard = new Keyboard();
const speaker = new Speaker();
const cpu = new CPU(renderer, keyboard, speaker);
const urlParams = new URLSearchParams(window.location.search);

const rom = urlParams.get("rom");
let loop;
let fps = 60, fpsInterval, startTime, now, then, elapsed;

// Begins whole emulation process
function init() {
	fpsInterval = 1000 / fps;
	then = Date.now();
	startTime = then;

	cpu.loadSpritesIntoMemory();
	cpu.loadRom(rom);
	loop = requestAnimationFrame(step);
}

// This function defines de op (operation) execution frequency of the cpu
// renders animation frames on every step
function step() {
	now = Date.now();
	elapsed = now - then;

	if (elapsed > fpsInterval) {
		cpu.cycle();
	}

	loop = requestAnimationFrame(step);
}

// Fires up the emulator
init();