export default {

    calculateHit(attacker, defender) {

        // The base miss % is 5%
        var baseMissPercent = 5;

        // Level difference adds to the percent
        var levelModifier = (defender.level - attacker.level) * .5;
        var missPercent = baseMissPercent + levelModifier;

        // The speed of the defender can add an additional 10%
        var evasionModifier = (defender.spd / 100) * 10;
        missPercent += evasionModifier;

        // Roll a number 0 to 100 and if it is less than the miss percent the attack misses
        var roll = Math.random() * 100;
        return roll > Math.round(missPercent);
    },

    calculateDamage(attacker, defender, baseDamage) {
        return attacker.str * 5;
    }
}