'use strict'

class Pet {
    constructor(name) {
        this.name = name;
        this.age = 0;
        this.health = 100;
        this.hunger = 0;
        this.mood = 100;
        this.status = "alive";
    }

    updateStatus() {
        if (this.health <= 0 || this.hunger >= 100) {
            this.status = "dead";
        } else if (this.health <= 30) {
            this.status = "sick";
        } else {
            this.status = "alive";
        }
    }

    calculateMood() {
        this.mood = Math.floor((this.health + (100 - this.hunger)) / 2);
    }

    passTime() {
        this.age += 1;
        this.hunger += 3;
        if (this.hunger > 70) {
            this.health -= 5;
        } else {
            this.health -= 2;
        }
        this.calculateMood();
        this.updateStatus();
    }
}

module.exports = Pet;