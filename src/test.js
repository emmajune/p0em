function senToLc(str) {
    str = str[0].toLowerCase() + str.slice(1)
    var patt = /\.[ \n]+?[A-Z0-9]/gd
    let match
    while ((match = patt.exec(str)) !== null) {
        const indices = match.indices[0]
        const lowercase = match[0].toLowerCase()
        str = str.slice(0,indices[0]) + lowercase + str.slice(indices[1])
    }
    return str
}


var str = `As the U.S. slowly continues its brokered negotiations with Iran over its nuclear program and ballistic missiles, it is also expanding its military posture across the Middle East — amounting to the biggest military buildup in the region since the 2003 invasion of Iraq.

Indirect talks between Iran and the U.S. took place in Geneva on February 17 with little progress and plenty of details left to discuss. According to U.S. officials, the Islamic Republic offered to come back within two weeks with a proposal which addresses some core issues and gaps in the positions by both parties. Meanwhile, Donald Trump’s actions play a different tune. On February 19, Trump announced he would give Iran 10 to 15 days to reach a deal, otherwise the U.S. claims to be fully prepared to take military action, the consequences of which could lead to a regional catastrophe. The next talks are set to take place on February 26.

Ahead of those talks, Donald Trump has deployed the USS Gerald R. Ford, the world’s largest aircraft carrier, which is set to join the Abraham Lincoln carrier strike group in the Arabian Sea. The United States has also significantly increased air power in the Middle East; according to open-source intelligence analysts and flight-tracking data, over 120 U.S. aircraft have deployed to the region. With each warship it repositions, each military personnel it places on alert, and all of the air power it has amassed in the region, the U.S. sends a message that diplomacy may no longer be on the table.

Both U.S. officials and international partners have voiced concern over the likelihood of a war with Iran. The United Kingdom has reportedly said that the United States would not be allowed to use British airbases, including Diego Garcia and Royal Air Force Fairford, for strikes against Iran, citing concerns that such action would violate international law.

Meanwhile, in Congress, Kentucky Republican Thomas Massie and California Democrat Ro Khanna have joined forces again to push a war powers resolution. The 1973 War Powers Act grants Congress the authority to check President Trump’s ability and power to enter an armed conflict without legislative approval.`

str = senToLc(str)

let propNouns = []
//incorporate lowercase preceding articles for proper nouns?
let patt = /([A-Z][A-Za-z’'—–]+?[ .;:!?,]){2,}/gd

let matches = str.matchAll(patt).toArray()

for (let match of matches) {
    str = str.replaceAll(match[0], ' ')
    propNouns.push(match[0].slice(0,-1))
}

str = str.replaceAll('  ', ' ')

propNouns = propNouns.flat(2)

console.log(str)