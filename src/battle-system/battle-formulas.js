export default {

    calculateHit(attacker, defender) {

        // The base miss % is 5%
        var baseMissPercent = 5;

        // Level difference adds to the percent
        var levelModifier = (defender.level - attacker.level) * .5;
        var missPercent = baseMissPercent + levelModifier;

        // The evasion of the defender can add an additional 10%
        var evasionModifier = (defender.eva / 100) * 10;
        missPercent += evasionModifier;

        // Roll a number 0 to 100 and if it is less than the miss percent the attack misses
        var roll = Math.random() * 100;
        return roll > Math.round(missPercent);
    },

    calculateDamage(attacker, defender, power) {

        // First calculate the base damage
        var baseDamage =
            attacker.str +
            ((attacker.str + attacker.level) / 32) *
            ((attacker.str * attacker.level) / 32);

        // Then calculate the max damage
        var maxDamage = ((power * (512 - defender.def) * baseDamage) / (16*512));

        // Then calculate the actual damage
        var randomNumber = Math.floor(Math.random() * 256);
        var actualDamage = maxDamage * (3841 + randomNumber) / 4096;

        // Damage can never be negative
        actualDamage = actualDamage < 0 ? 0 : actualDamage;

        // Return the actual damage
        return actualDamage;
    }
}