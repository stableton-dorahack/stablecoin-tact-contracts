// Recursive power function. 
// It is used to calculate the exponentiation of a fixed-point number to a non-integer power.
// It should be rewritten in fift to save gas

// here n is stabilityFeeRate = 1000000000623 = seconds**1.000000000623
// precision = 10**12

fun rpow(x: Int, n: Int, precision: Int): Int {
    let z: Int = 0;

    if (n % 2 == 0) {
        z = precision;
    } else {
        z = x;
    }

    let half: Int = precision / 2;

    while (n / 2 > 0) {
        let xx: Int = x*x;
        let xxRound: Int = xx + half;
    
        x = xxRound / precision;

        if(x % 2 == 0){
            let zx: Int = z * x;
            let zxRound: Int = zx + half;
            z = zxRound / precision;
        }
    }

    return z;

}

