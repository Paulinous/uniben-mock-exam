import { useState, useEffect, useRef } from “react”;

const GLOBAL_CSS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=Source+Serif+4:wght@300;400;600&family=JetBrains+Mono:wght@400;600;700&display=swap'); *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;} body{background:#05090f;} ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:#05090f;} ::-webkit-scrollbar-thumb{background:#1a2f4a;border-radius:99px;} @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}} @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}} @keyframes slideDown{from{transform:translateY(-100%);opacity:0;}to{transform:translateY(0);opacity:1;}} @keyframes countUp{from{opacity:0;transform:scale(.7);}to{opacity:1;transform:scale(1);}} @keyframes confettiFall{0%{transform:translateY(-10px) rotate(0deg);opacity:1;}100%{transform:translateY(105vh) rotate(800deg);opacity:0;}} @keyframes glowPulse{0%,100%{box-shadow:0 0 20px #00d08422;}50%{box-shadow:0 0 40px #00d08466;}}`;

const EXAM = {
course:“CHM 211”, title:“Organic Chemistry I”, level:“200L”, session:“2023/2024”, durationMins:90,
sections:[
{ id:“A”, color:”#00d084”, dark:”#007a4d”, label:“Section A”,
questions:[
{id:“a1”,topic:“Alcohols”,text:“Which of the following is a primary alcohol?”,options:[“A. (CH₃)₃COH”,“B. CH₃CH₂OH”,“C. (CH₃)₂CHOH”,“D. C₆H₅OH”],answer:“B”,
hint:“A primary alcohol has —OH attached to a carbon bonded to only ONE other carbon.”,
explanation:“CH₃CH₂OH (ethanol) is a primary alcohol because the carbon atom bearing the —OH group is bonded to only one other carbon. Primary alcohols have the structure R—CH₂—OH. This classification determines the oxidation pathway: primary alcohols oxidise to aldehydes first, then to carboxylic acids — a reaction sequence unique to primary alcohols and impossible for tertiary alcohols, which resist oxidation entirely due to the absence of a C—H bond at the hydroxyl-bearing carbon.”},

```
    {id:"a2",topic:"Reactions",text:"What type of reaction converts an alkene to an alkane?",options:["A. Oxidation","B. Substitution","C. Hydrogenation","D. Elimination"],answer:"C",
    hint:"Think about adding H₂ across a double bond with a metal catalyst.",
    explanation:"Hydrogenation adds molecular hydrogen (H₂) across the C=C double bond of an alkene, converting it to an alkane. The reaction requires a heterogeneous catalyst — typically platinum (Pt), palladium (Pd), or nickel (Ni) — which adsorbs both the alkene and H₂ onto its metallic surface and facilitates simultaneous delivery of two hydrogen atoms across the double bond. This process converts unsaturated compounds to saturated ones and releases energy (heat of hydrogenation), confirming the greater thermodynamic stability of alkanes over alkenes."},

    {id:"a3",topic:"Nomenclature",text:"The IUPAC name for CH₃CH₂CH₂COOH is:",options:["A. Propanoic acid","B. Butanoic acid","C. Pentanoic acid","D. Hexanoic acid"],answer:"B",
    hint:"Count ALL carbons including the one in —COOH.",
    explanation:"IUPAC nomenclature requires counting every carbon in the chain, including the carbon of the carboxyl group (—COOH) itself. CH₃CH₂CH₂COOH has four carbons total: C1 is the carboxyl carbon, C2 and C3 are methylene groups, and C4 is the terminal methyl. The four-carbon parent chain is named 'butane,' and the suffix '—oic acid' is added, giving Butanoic acid. This systematic approach ensures the functional group carbon is never excluded from the count, which is the most common error students make."},

    {id:"a4",topic:"Reactions",text:"Which reagent distinguishes aldehydes from ketones?",options:["A. Lucas reagent","B. Grignard reagent","C. Tollens' reagent","D. Fenton's reagent"],answer:"C",
    hint:"Look for the test that produces a silver mirror on the inner wall of the test tube.",
    explanation:"Tollens' reagent is ammoniacal silver nitrate [Ag(NH₃)₂]⁺OH⁻, a mild oxidising agent specific to aldehydes. Aldehydes possess a hydrogen atom on the carbonyl carbon (R—CHO), which can be oxidised. Tollens' reagent oxidises the aldehyde to a carboxylate anion while simultaneously reducing silver ions (Ag⁺) to metallic silver (Ag⁰), which deposits as a shiny silver mirror on the glass wall. Ketones have no such hydrogen at the carbonyl carbon (R₂C=O), making them resistant to this mild oxidation. This test therefore uniquely identifies aldehydes with 100% selectivity."},

    {id:"a5",topic:"Aromaticity",text:"Benzene preferentially undergoes:",options:["A. Addition reactions","B. Elimination reactions","C. Electrophilic substitution","D. Nucleophilic substitution"],answer:"C",
    hint:"Benzene is aromatic — it strongly favours reactions that preserve its ring stability.",
    explanation:"Benzene's six π electrons are completely delocalised around the ring, providing ~150 kJ/mol of extra thermodynamic stability called resonance energy. Electrophilic aromatic substitution (EAS) allows benzene to react with an electrophile while completely restoring the aromatic system in the product — preserving every kilojoule of that stabilisation energy. If benzene underwent addition reactions instead, the aromatic system would be permanently destroyed and the energy advantage lost. Nature therefore overwhelmingly favours substitution, and benzene is extraordinarily resistant to addition reactions compared to typical alkenes."},

    {id:"a6",topic:"Functional Groups",text:"The functional group —CONH₂ is characteristic of:",options:["A. Esters","B. Amides","C. Acids","D. Aldehydes"],answer:"B",
    hint:"This group has both a carbonyl (C=O) and a nitrogen atom directly bonded to the carbonyl carbon.",
    explanation:"The —CONH₂ group defines a primary amide. It is formed when a carboxylic acid condenses with ammonia, eliminating water. The key structural feature is a nitrogen atom directly bonded to a carbonyl carbon. Resonance between the C=O and C—N bonds gives the amide partial double-bond character at the C—N position, making it planar and unusually resistant to hydrolysis under physiological conditions. This resonance stabilisation is precisely why the peptide bond — an amide linkage — provides the rigid structural backbone of proteins and polypeptides in biological systems."},

    {id:"a7",topic:"Amines",text:"Which of these is a tertiary amine?",options:["A. CH₃NH₂","B. (CH₃)₂NH","C. (CH₃)₃N","D. CH₃CH₂NH₂"],answer:"C",
    hint:"Count how many carbon groups are directly bonded to the nitrogen atom.",
    explanation:"In (CH₃)₃N (trimethylamine), the nitrogen atom is bonded to three methyl groups and carries no N—H bonds — this is the definition of a tertiary amine. The classification matters chemically: tertiary amines cannot form hydrogen bonds with each other (no N—H), giving them markedly lower boiling points than primary or secondary amines of comparable molecular mass. Tertiary amines are also important as catalysts in organic synthesis and as bases in biochemistry — for example, the neurotransmitter acetylcholine contains a quaternary nitrogen (one step beyond tertiary)."},

    {id:"a8",topic:"Mechanisms",text:"Markovnikov's rule applies to:",options:["A. Elimination reactions","B. Electrophilic addition to alkenes","C. Free radical substitution","D. Esterification"],answer:"B",
    hint:"This rule predicts which carbon gets H and which gets X in HX addition to an unsymmetrical alkene.",
    explanation:"Markovnikov's rule governs electrophilic addition of HX to unsymmetrical alkenes. The mechanistic basis is carbocation stability: H⁺ adds first to the carbon with more hydrogens, generating the more substituted (and more stable) carbocation intermediate, stabilised by hyperconjugation and inductive donation from adjacent alkyl groups. The halide (X⁻) then adds to this more stable carbocation. More substituted carbocations are lower in energy (3° > 2° > 1°), so the reaction proceeds preferentially through this pathway, making the more substituted halide the major product. This rule breaks down under free radical conditions (anti-Markovnikov)."},

    {id:"a9",topic:"Hybridization",text:"The hybridization of carbon in ethyne (C₂H₂) is:",options:["A. sp³","B. sp²","C. sp","D. dsp²"],answer:"C",
    hint:"Triple bonds always involve sp hybridization — one sigma and two pi bonds.",
    explanation:"In ethyne (HC≡CH), each carbon forms a triple bond consisting of one σ bond and two π bonds. To accomplish this, each carbon mixes its 2s orbital with only one 2p orbital, creating two sp hybrid orbitals oriented linearly at 180° to each other. The remaining two unhybridised 2p orbitals on each carbon are perpendicular to the molecular axis and to each other; they overlap side-by-side with the corresponding p orbitals on the adjacent carbon to form two π bonds of the triple bond. This sp hybridisation is responsible for ethyne's linear geometry, its 180° H—C—C bond angle, and its higher acidity compared to sp² and sp³ carbons."},

    {id:"a10",topic:"Reactions",text:"Which compound gives a positive iodoform test?",options:["A. Methanol","B. Ethanol","C. Propan-1-ol","D. Butan-1-ol"],answer:"B",
    hint:"The iodoform test is positive only for compounds containing the CH₃CHOH— or CH₃CO— group.",
    explanation:"The iodoform test detects the CH₃CH(OH)— or CH₃CO— structural unit. Ethanol (CH₃CH₂OH) contains this exact unit — it is oxidised in situ to ethanal (CH₃CHO), which then undergoes exhaustive halogenation at the methyl group followed by base-promoted cleavage of the C—C bond, releasing iodoform (CHI₃) as a yellow precipitate with a characteristic antiseptic smell. Propan-1-ol (CH₃CH₂CH₂OH) lacks the methyl group adjacent to the hydroxyl and fails the test. Butan-1-ol similarly lacks this feature. Methanol is oxidised to formaldehyde, which also fails the test."},

    {id:"a11",topic:"Reactions",text:"Saponification is the alkaline hydrolysis of:",options:["A. Ethers","B. Esters","C. Amides","D. Alkyl halides"],answer:"B",
    hint:"This reaction forms soap and is the origin of the word 'saponification' (Latin: sapo = soap).",
    explanation:"Saponification is the irreversible alkaline hydrolysis of an ester using NaOH or KOH solution, producing a carboxylate salt (soap) and an alcohol. The reaction is irreversible because the carboxylate anion is resonance-stabilised and will not re-esterify under basic conditions, distinguishing it from the reversible acid-catalysed hydrolysis. Industrially, saponification of animal fats (triglycerides — glycerol esters of long-chain fatty acids) with NaOH produces sodium salts of fatty acids, which are soaps. The long hydrocarbon tail is hydrophobic (oil-attracting) and the carboxylate head is hydrophilic (water-attracting), giving soaps their cleansing action."},

    {id:"a12",topic:"Industry",text:"Converting vegetable oils to solid fats involves:",options:["A. Saponification","B. Hydrogenation","C. Esterification","D. Fermentation"],answer:"B",
    hint:"The C=C double bonds in oils are converted to C—C single bonds by adding H₂.",
    explanation:"Vegetable oils are liquid because their long-chain fatty acids contain multiple C=C double bonds (unsaturated) that introduce bends and kinks in the chain, preventing tight molecular packing and lowering the melting point. Catalytic hydrogenation (Ni catalyst, ~200°C, high H₂ pressure) adds hydrogen across these double bonds, producing straighter, saturated fatty acid chains that pack more tightly — raising the melting point and solidifying the fat. The process is used to manufacture margarine and cooking fats. Partial hydrogenation creates trans fatty acids as a side product; full hydrogenation gives completely saturated fats with no trans isomers."},

    {id:"a13",topic:"Mechanisms",text:"Which of the following is an electrophile?",options:["A. NH₃","B. OH⁻","C. H₂O","D. BF₃"],answer:"D",
    hint:"An electrophile is electron-DEFICIENT — it accepts electron pairs to form bonds.",
    explanation:"BF₃ is a quintessential Lewis acid and electrophile. Boron in BF₃ has only six valence electrons (three bonding pairs from B—F bonds) and an empty p orbital, making it strongly electron-deficient and eager to accept an electron pair from a donor (Lewis base). NH₃, OH⁻, and H₂O all possess lone pairs and are nucleophiles (electron donors). BF₃'s powerful Lewis acidity makes it an essential catalyst in organic synthesis — it activates carbonyl compounds, generates carbocations from alkyl halides in Friedel-Crafts reactions, and coordinates with heteroatoms to increase the electrophilicity of adjacent carbons."},

    {id:"a14",topic:"Reactions",text:"Reaction of an alcohol with a carboxylic acid produces:",options:["A. Ether","B. Ester","C. Aldehyde","D. Ketone"],answer:"B",
    hint:"This condensation reaction releases water and forms an ester linkage (—COO—).",
    explanation:"Fischer esterification is the acid-catalysed condensation of a carboxylic acid (R—COOH) and an alcohol (R'—OH) to form an ester (R—COOR') and water. Concentrated H₂SO₄ catalyses the reaction by protonating the carbonyl oxygen, activating the carbonyl carbon toward nucleophilic attack by the alcohol oxygen. After a series of proton transfers and loss of water, the tetrahedral intermediate collapses to give the ester. The reaction is reversible and governed by Le Chatelier's principle — using excess alcohol or removing water shifts equilibrium toward ester formation. Esters give fruits, flowers, and beverages their characteristic aromas."},

    {id:"a15",topic:"Alkanes",text:"Which is NOT a typical reaction of alkanes?",options:["A. Combustion","B. Halogenation","C. Electrophilic addition","D. Thermal cracking"],answer:"C",
    hint:"Alkanes have only sigma bonds — what reaction requires a π system?",
    explanation:"Electrophilic addition requires a π bond because the electrophile attacks the electron-rich π system. Alkanes are completely saturated — they contain only strong C—C σ bonds and C—H σ bonds with no π electrons or electron-rich sites for electrophilic attack. This chemical inertness under normal conditions is why alkanes were historically called 'paraffins' (Latin: parum affinis = little affinity). Alkanes do react via combustion (exothermic, complete oxidation), free radical halogenation (UV light initiates homolytic C—H bond cleavage), and thermal/catalytic cracking (high-temperature C—C bond cleavage). All three proceed by radical or thermal mechanisms, never electrophilic."},

    {id:"a16",topic:"Nomenclature",text:"The general formula for alkynes is:",options:["A. CₙH₂ₙ₊₂","B. CₙH₂ₙ","C. CₙH₂ₙ₋₂","D. CₙH₂ₙ₋₄"],answer:"C",
    hint:"Start from the alkane formula (CₙH₂ₙ₊₂) and subtract 2H for each degree of unsaturation.",
    explanation:"Each degree of unsaturation reduces the hydrogen count by 2 relative to the saturated alkane CₙH₂ₙ₊₂. A triple bond introduces two degrees of unsaturation (one σ bond plus two π bonds — each π bond is one degree). Therefore a triple bond reduces the hydrogen count by 4 (2 × 2), giving CₙH₂ₙ₊₂ − 4 = CₙH₂ₙ₋₂. Verification: ethyne C₂H₂ → formula gives 2(2)−2 = 2 hydrogens ✓; propyne C₃H₄ → 2(3)−2 = 4 ✓. This formula is essential for calculating degrees of unsaturation and determining molecular structure from a molecular formula."},

    {id:"a17",topic:"Aromaticity",text:"Which bond exists in benzene but NOT in cyclohexane?",options:["A. C—C single bond","B. C—H bond","C. Delocalised π electrons","D. Sigma bond"],answer:"C",
    hint:"Benzene is aromatic — Hückel's rule requires a continuous cyclic π system.",
    explanation:"Benzene has six π electrons delocalised over all six carbon atoms in the ring, forming a continuous toroidal electron cloud above and below the molecular plane. This delocalisation satisfies Hückel's rule (4n+2 π electrons, n=1) and confers approximately 150 kJ/mol of extra thermodynamic stability (resonance energy). Cyclohexane is fully saturated with no double bonds, no π electrons, and no delocalisation — every carbon is sp³ hybridised. Both molecules share C—C σ bonds, C—H bonds, and σ bonds. The delocalised π electron system is benzene's unique structural feature and the entire basis of its exceptional chemical stability and aromatic reactivity."},

    {id:"a18",topic:"Oxidation",text:"Complete oxidation of ethanol produces:",options:["A. Ethanal","B. Ethanoic acid","C. CO₂ and H₂O","D. Ethene"],answer:"C",
    hint:"Complete oxidation means ALL carbon atoms are fully oxidised — think combustion.",
    explanation:"Complete oxidation means every atom in the molecule is oxidised to its highest possible oxidation state: carbon to CO₂ (+4 oxidation state) and hydrogen to H₂O. For ethanol: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O. This is combustion. Partial oxidation with controlled reagents gives intermediate products — acidified K₂Cr₂O₇ first oxidises ethanol to ethanal (aldehyde), then with excess oxidant to ethanoic acid. However, 'complete' oxidation unambiguously means full combustion to CO₂ and H₂O — the final products when no further oxidation is chemically possible. This distinction between partial and complete oxidation is fundamental in organic chemistry."},

    {id:"a19",topic:"Aromaticity",text:"Introduction of —NO₂ into a benzene ring is called:",options:["A. Chlorination","B. Sulfonation","C. Nitration","D. Alkylation"],answer:"C",
    hint:"The electrophile is NO₂⁺ (nitronium ion), generated from concentrated HNO₃ and H₂SO₄.",
    explanation:"Nitration is the electrophilic aromatic substitution that introduces a nitro group (—NO₂) into benzene. The active electrophile is the nitronium ion (NO₂⁺), generated when concentrated H₂SO₄ protonates HNO₃: HNO₃ + H₂SO₄ → NO₂⁺ + HSO₄⁻ + H₂O. The NO₂⁺ attacks benzene's π electrons, forming a Wheland intermediate (arenium ion), which then loses H⁺ to restore aromaticity and yield nitrobenzene. Nitration is the first step in manufacturing explosives (TNT = 2,4,6-trinitrotoluene), pharmaceutical compounds, and synthetic dyes. The reaction is typically conducted at 55°C to prevent polynitration."},

    {id:"a20",topic:"Isomerism",text:"Geometric (cis-trans) isomerism is possible in:",options:["A. Alkanes","B. Alkynes","C. Alkenes","D. Open-chain compounds only"],answer:"C",
    hint:"Restricted rotation about a C=C bond and two different groups on each carbon are required.",
    explanation:"Geometric isomerism requires two conditions simultaneously: restricted rotation about a bond, and two different substituents on each carbon of that bond. Alkenes satisfy both — the C=C π bond prevents free rotation (breaking it requires ~265 kJ/mol), and when each sp² carbon carries two different groups, cis (same side) and trans (opposite sides) isomers with distinct physical properties result. Alkanes rotate freely about every C—C σ bond, eliminating the possibility of geometric isomers. Alkynes are linear (sp hybridised), so each triple-bond carbon has only one substituent direction, making cis-trans isomerism geometrically impossible."},

    {id:"a21",topic:"Acidity",text:"Which of these carboxylic acids is the strongest?",options:["A. CH₃COOH","B. CCl₃COOH","C. CF₃COOH","D. CBr₃COOH"],answer:"C",
    hint:"The inductive effect of the halogen determines how well the carboxylate anion is stabilised.",
    explanation:"Acid strength increases as the carboxylate anion (RCOO⁻) is better stabilised after proton loss — achieved by withdrawing electron density from the negatively charged oxygen atoms. Fluorine is the most electronegative element (χ = 4.0), and three F atoms on the α-carbon create a powerful electron-withdrawing inductive effect that delocalises and stabilises the carboxylate anion far more effectively than Cl (χ = 3.0) or Br (χ = 2.8). CF₃COOH has pKa ≈ 0.5 versus CH₃COOH at pKa ≈ 4.76 — a difference of more than 4 pKa units, meaning CF₃COOH is over 25,000 times more acidic than acetic acid."},

    {id:"a22",topic:"Industry",text:"Industrial production of ethanol from ethylene uses:",options:["A. Fermentation","B. Hydration","C. Hydrogenation","D. Oxidation"],answer:"B",
    hint:"Water is added across the double bond — this is the direct hydration process.",
    explanation:"Industrial catalytic hydration of ethylene: CH₂=CH₂ + H₂O → CH₃CH₂OH, using H₃PO₄ on silica catalyst at ~300°C and 60–70 atm. The mechanism follows Markovnikov addition of water across the double bond. This petrochemical route is preferred over fermentation for large-scale industrial alcohol production because it is faster, gives higher purity product, and uses ethylene from petroleum cracking as a cheap feedstock. Fermentation (biological conversion of sugars by yeast) is used for beverage-grade ethanol. Hydrogenation would convert ethylene to ethane, not ethanol; oxidation would give acetaldehyde or acetic acid."},

    {id:"a23",topic:"Functional Groups",text:"A compound C₄H₁₀O that is an ether would be:",options:["A. Butan-1-ol","B. 2-methylpropan-2-ol","C. Ethoxyethane","D. Butanal"],answer:"C",
    hint:"Ethers have the R—O—R' structure — no O—H bond present.",
    explanation:"Ethoxyethane (diethyl ether, CH₃CH₂—O—CH₂CH₃) has molecular formula C₄H₁₀O and the defining ether structure: an oxygen atom bonded to two separate carbon groups with no O—H bond. Butan-1-ol and 2-methylpropan-2-ol both contain —OH groups (alcohols), and butanal (C₄H₈O) has a different molecular formula and is an aldehyde. Ethoxyethane is chemically inert under most conditions (no reactive O—H), making it an excellent laboratory solvent. Its low boiling point (34.6°C) and high vapour pressure make it extremely flammable — a critical safety consideration in practical chemistry."},

    {id:"a24",topic:"Polymers",text:"The monomer of natural rubber is:",options:["A. Styrene","B. Isoprene","C. Vinyl chloride","D. Ethylene"],answer:"B",
    hint:"Natural rubber is cis-1,4-polyisoprene — isoprene is 2-methylbuta-1,3-diene.",
    explanation:"Natural rubber is cis-1,4-polyisoprene, biosynthesised in the latex of Hevea brasiliensis trees by enzymatic polymerisation of isoprene (2-methylbuta-1,3-diene, CH₂=C(CH₃)—CH=CH₂). Each isoprene unit contributes one C=C double bond to the polymer backbone and a methyl branch. The cis configuration about the remaining double bond in each repeating unit creates a kinked chain that cannot pack closely, giving natural rubber its characteristic amorphous, flexible, elastomeric properties. The synthetic trans isomer (gutta-percha) has a more linear chain and is hard and brittle. Isoprene is also the fundamental 5-carbon building block of all terpenes and steroids in biology."},

    {id:"a25",topic:"Reactions",text:"Which test confirms the presence of a C=C double bond?",options:["A. Tollens' test","B. Iodoform test","C. Bromine water test","D. Lucas test"],answer:"C",
    hint:"The orange-brown colour of bromine water disappears instantly when added to an alkene.",
    explanation:"Bromine water (Br₂/H₂O) is orange-brown. When an alkene is added, electrophilic addition occurs: the electrophilic Br₂ molecule is polarised by the alkene's π electrons, the bromonium ion intermediate forms, and bromide attacks — adding one Br to each carbon of the double bond to give a colourless vicinal dibromoalkane. The complete discharge of the orange-brown colour is the positive result. Alkanes do not react with bromine water without UV light, making this test selective for π bonds. In UV light, alkanes react by free radical mechanism (different chemistry, slower). Tollens' detects aldehydes; iodoform detects CH₃CO— groups; Lucas distinguishes alcohol classes."},
  ]
},
{ id:"B", color:"#4f8ef7", dark:"#1d4ed8", label:"Section B",
  questions:[
    {id:"b1",topic:"Intermolecular Forces",text:"Which of the following has the highest boiling point?",options:["A. CH₄","B. C₂H₆","C. C₄H₁₀","D. C₈H₁₈"],answer:"D",
    hint:"London dispersion forces increase with molecular size — more electrons means stronger forces.",
    explanation:"In a homologous series of nonpolar alkanes, boiling point increases with molecular mass because larger molecules possess more electrons and greater surface area, producing stronger London (dispersion) forces. These instantaneous dipole–induced dipole forces require more thermal energy to overcome during vaporisation. C₈H₁₈ (octane, MW 114, bp 126°C) has far more electrons than CH₄ (MW 16, bp −161°C), C₂H₆ (MW 30, bp −89°C), or C₄H₁₀ (MW 58, bp −1°C). This regular boiling point increase is the physical basis of petroleum distillation — crude oil fractions are separated by exploiting these predictable boiling point differences between alkane chains of different lengths."},

    {id:"b2",topic:"Mechanisms",text:"Which of the following is NOT a nucleophile?",options:["A. Cl⁻","B. NH₃","C. H₂O","D. AlCl₃"],answer:"D",
    hint:"Nucleophiles are electron-RICH donors — AlCl₃ behaves as an electron ACCEPTOR.",
    explanation:"Nucleophiles are electron-rich species that donate a lone pair to form a new bond with an electrophilic centre. AlCl₃ (aluminium trichloride) is the opposite — aluminium has only six valence electrons and an empty p orbital, making it strongly electron-deficient and a Lewis acid (electrophile). AlCl₃ accepts electron pairs; it does not donate them. Cl⁻ has four lone pairs and negative charge (nucleophilic), NH₃ has a lone pair on nitrogen (nucleophilic), H₂O has two lone pairs (weakly nucleophilic). AlCl₃ is essential as an electrophile-activator in Friedel-Crafts chemistry — it coordinates with RCl to generate the carbocation electrophile R⁺ needed for aromatic substitution."},

    {id:"b3",topic:"Reactions",text:"HBr addition to propene by Markovnikov's rule gives:",options:["A. 1-bromopropane","B. 2-bromopropane","C. 1,2-dibromopropane","D. Propane"],answer:"B",
    hint:"H⁺ adds to the carbon with MORE hydrogens, generating the more stable secondary carbocation.",
    explanation:"In Markovnikov addition of HBr to propene (CH₃—CH=CH₂), H⁺ adds to C1 (the terminal carbon with two H atoms), generating the secondary carbocation CH₃—C⁺H—CH₃. This secondary carbocation is more stable than the primary carbocation (CH₃—CH₂—CH₂⁺) that would form if H⁺ added to C2, because two adjacent methyl groups stabilise the positive charge through hyperconjugation and inductive electron donation. Bromide (Br⁻) then attacks the more stable secondary carbocation at C2, giving 2-bromopropane as the major product. This mechanism precisely demonstrates how thermodynamic carbocation stability controls regioselectivity in electrophilic addition."},

    {id:"b4",topic:"Biochemistry",text:"Proteins are polymers of:",options:["A. Glucose","B. Nucleotides","C. Amino acids","D. Fatty acids"],answer:"C",
    hint:"Proteins are polypeptides — each monomer unit contains both an amino and a carboxyl group.",
    explanation:"Proteins are formed by condensation polymerisation of amino acids, each of which contains an α-amino group (—NH₂), an α-carboxyl group (—COOH), and a unique side chain (R group) that determines the amino acid's chemical character. During peptide bond formation, the —COOH of one amino acid reacts with the —NH₂ of the next, eliminating water and forming the covalent amide bond (—CO—NH—) known as the peptide bond. Repeating this process hundreds or thousands of times produces a polypeptide chain. The specific sequence of amino acids (primary structure) dictates folding into helices and sheets (secondary), three-dimensional shape (tertiary), and ultimately biological function — enzyme activity, structural support, transport, and signalling."},

    {id:"b5",topic:"Biochemistry",text:"Which of the following is a reducing sugar?",options:["A. Sucrose","B. Starch","C. Glucose","D. Cellulose"],answer:"C",
    hint:"Reducing sugars have a free anomeric hydroxyl group in equilibrium with an open-chain aldehyde.",
    explanation:"Glucose is an aldohexose that exists in equilibrium between its ring (pyranose) and open-chain forms. In the open-chain form, the free aldehyde group (—CHO) at C1 can donate electrons to (reduce) oxidising agents such as Fehling's solution (Cu²⁺ → Cu₂O, brick-red precipitate) and Benedict's solution. This makes glucose a reducing sugar. Sucrose is a non-reducing disaccharide because its anomeric carbons of both glucose and fructose are involved in the glycosidic bond, eliminating the free aldehyde/ketone group. Starch and cellulose are long-chain polymers of glucose with only one free reducing end per chain — they test weakly positive at best and are classified as non-reducing for practical purposes."},

    {id:"b6",topic:"Hybridization",text:"The bond angle in methane (CH₄) is approximately:",options:["A. 90°","B. 109.5°","C. 120°","D. 180°"],answer:"B",
    hint:"sp³ hybridisation produces four equivalent orbitals pointing to the corners of a tetrahedron.",
    explanation:"In methane, the central carbon undergoes sp³ hybridisation — mixing one 2s and three 2p orbitals to produce four equivalent sp³ hybrid orbitals. VSEPR theory dictates that four electron pairs around a central atom adopt a tetrahedral arrangement to maximise their separation and minimise repulsion. The tetrahedral geometry places all four C—H bonds at the mathematically optimal angle of 109.5° (the tetrahedral angle). This geometry distributes the four bonding pairs as far apart as possible in three-dimensional space. The 109.5° bond angle is the universal benchmark for any sp³-hybridised carbon in organic chemistry and is central to understanding the three-dimensional structure of organic molecules."},

    {id:"b7",topic:"Reactions",text:"Dehydration of an alcohol produces:",options:["A. Alkane","B. Alkene","C. Alkyne","D. Carboxylic acid"],answer:"B",
    hint:"Dehydration removes H₂O across adjacent carbons — an E1 or E2 elimination mechanism.",
    explanation:"Alcohol dehydration is an elimination reaction in which a water molecule is removed from adjacent carbons: the —OH group leaves one carbon and an —H atom leaves the neighbouring carbon, forming a C=C double bond (alkene). Heating ethanol with concentrated H₂SO₄ at 170°C achieves this: the —OH is first protonated to form a good leaving group (H₂O), then a carbocation (E1) or concerted (E2) mechanism produces the alkene. At lower temperatures (140°C), the same conditions favour substitution (ether formation). For secondary and tertiary alcohols, Zaitsev's rule predicts the major alkene: the more substituted (more stable) alkene predominates. This reaction is the reverse of hydration."},

    {id:"b8",topic:"History",text:"Which compound was historically used as a surgical anesthetic?",options:["A. Ethanol","B. Methanol","C. Diethyl ether","D. Chloroform"],answer:"D",
    hint:"This halogenated compound was introduced to surgery by James Young Simpson in 1847.",
    explanation:"Chloroform (CHCl₃, trichloromethane) was introduced as a surgical anesthetic in 1847 by Scottish physician James Young Simpson and rapidly adopted worldwide because it was more potent and faster-acting than diethyl ether. Inhaled chloroform vapour depresses the central nervous system, producing unconsciousness. However, chloroform has a critically narrow therapeutic index — the anesthetic dose is dangerously close to the lethal dose — and causes hepatotoxicity (liver damage) with repeated exposure, due to metabolic conversion to the reactive intermediate phosgene (COCl₂). These safety concerns led to its replacement by safer agents. Chloroform is now used as a laboratory solvent rather than a medicine."},

    {id:"b9",topic:"Reactions",text:"Sodium reacting with ethanol produces:",options:["A. Sodium ethanoate + H₂","B. Sodium ethoxide + H₂","C. Diethyl ether + NaOH","D. Ethene + NaOH"],answer:"B",
    hint:"The O—H bond in ethanol reacts with sodium metal — analogous to sodium reacting with water.",
    explanation:"Ethanol reacts with sodium metal analogously to water reacting with sodium, but more slowly because ethanol is a slightly weaker acid (pKa ≈ 16) than water (pKa ≈ 15.7). Sodium donates an electron to the O—H bond, causing homolytic cleavage: 2Na + 2CH₃CH₂OH → 2CH₃CH₂ONa + H₂↑. The product sodium ethoxide (C₂H₅ONa) is an ionic alkoxide salt — a strong base and excellent nucleophile widely used in Williamson ether synthesis and Claisen condensations. The vigorous gas evolution (H₂) is the observable evidence of the reaction. Sodium ethanoate would only form if ethanol were oxidised to acetic acid first."},

    {id:"b10",topic:"Nomenclature",text:"What does 'R' represent in organic chemistry?",options:["A. A radical only","B. Any alkyl group","C. A ring structure","D. A reactive group"],answer:"B",
    hint:"'R' is a placeholder symbol representing any carbon-chain substituent in a general formula.",
    explanation:"In organic chemistry notation, 'R' represents any alkyl group — a carbon-containing group derived from an alkane by removing one hydrogen (e.g. methyl CH₃—, ethyl C₂H₅—, isopropyl (CH₃)₂CH—). It functions as a wildcard allowing chemists to write general formulae applicable to an entire class of compounds rather than specific molecules. R—OH represents any alcohol; R—COOH represents any carboxylic acid; R—X represents any alkyl halide. When two different groups are needed, R and R' are used. The 'R' notation is indispensable for describing reaction mechanisms, reaction types, and functional group chemistry systematically without listing every possible specific compound."},

    {id:"b11",topic:"Isomerism",text:"CH₃OCH₃ and CH₃CH₂OH are examples of:",options:["A. Chain isomerism","B. Position isomerism","C. Functional group isomerism","D. Geometric isomerism"],answer:"C",
    hint:"Same molecular formula, entirely different functional groups — ether vs. alcohol.",
    explanation:"Functional group isomers share the same molecular formula but contain different functional groups, resulting in profoundly different physical and chemical properties. CH₃OCH₃ (dimethyl ether) and CH₃CH₂OH (ethanol) both have the formula C₂H₆O. Dimethyl ether has an ether linkage (R—O—R) and no O—H bond — it cannot form hydrogen bonds with itself, giving it a boiling point of −24°C. Ethanol has a hydroxyl group (—OH) and forms strong intermolecular hydrogen bonds, giving it a boiling point of 78°C. These compounds also undergo entirely different chemical reactions: ethanol can be oxidised, dehydrated, or esterified; diethyl ether is largely chemically inert under mild conditions."},

    {id:"b12",topic:"Aromaticity",text:"The degree of unsaturation for benzene (C₆H₆) is:",options:["A. 2","B. 3","C. 4","D. 6"],answer:"C",
    hint:"Use DoU = (2C + 2 − H) ÷ 2 and remember benzene has 3 double bonds plus 1 ring.",
    explanation:"The degree of unsaturation (DoU) formula for hydrocarbons is DoU = (2C + 2 − H) / 2. For benzene C₆H₆: DoU = (2×6 + 2 − 6) / 2 = (14 − 6) / 2 = 8/2 = 4. This value of 4 reflects benzene's three C=C double bonds (3 DoU) and one ring (1 DoU) in the Kekulé representation — though in reality all six π electrons are delocalised. The DoU formula is a powerful analytical tool: a value of 4 for a C₆ compound immediately suggests aromaticity to a chemist. For molecules containing nitrogen or halogens, the formula must be modified accordingly. Any DoU ≥ 4 combined with a C₆ fragment strongly indicates an aromatic ring."},

    {id:"b13",topic:"Acidity",text:"Which functional group is most acidic?",options:["A. —OH (alcohol)","B. —COOH","C. —NH₂","D. —CHO"],answer:"B",
    hint:"The more stable the conjugate base after H⁺ loss, the stronger the acid.",
    explanation:"Carboxylic acids (—COOH) are the most acidic common organic functional group because their conjugate base (the carboxylate anion, —COO⁻) is exceptionally stable through resonance. After losing H⁺, the negative charge is delocalised equally over both oxygen atoms in two equivalent resonance structures, spreading and stabilising the charge effectively. Alcohols (pKa ≈ 16–18) form alkoxide anions with charge localised on one oxygen — far less stable. Amines (pKa ≈ 35–38) form amide anions — extremely unstable. Typical carboxylic acids have pKa 4–5, making them ~10¹¹–10¹² times more acidic than alcohols. This exceptional acidity is why acetic acid is sour and alcohols are not."},

    {id:"b14",topic:"Polymers",text:"Addition polymerisation of ethylene gives:",options:["A. Nylon","B. Polystyrene","C. Polyethylene","D. PVC"],answer:"C",
    hint:"Polyethylene is named directly from its monomer — ethylene (ethene) polymerises to poly(ethylene).",
    explanation:"In addition polymerisation, monomers containing C=C double bonds react together: the π bond of each monomer breaks, and the liberated electrons form new C—C σ bonds linking monomers into a chain without releasing any by-product. Ethylene (CH₂=CH₂) polymerises to give polyethylene (—CH₂—CH₂—)ₙ, the world's most widely produced plastic. Different reaction conditions give different forms: free-radical initiation at high pressure gives branched LDPE (low density, flexible packaging); Ziegler-Natta catalysts give linear HDPE (high density, rigid containers). Nylon forms by condensation of diamine and diacid (not addition); polystyrene comes from styrene monomer; PVC from vinyl chloride."},

    {id:"b15",topic:"Reactions",text:"Which reagent converts a ketone to a secondary alcohol?",options:["A. K₂Cr₂O₇/H⁺","B. NaBH₄ or LiAlH₄","C. Tollens' reagent","D. PCl₅"],answer:"B",
    hint:"Reduction adds hydrogen — hydride (H⁻) donors are used to reduce carbonyl groups.",
    explanation:"NaBH₄ and LiAlH₄ are hydride-transfer reducing agents that deliver hydride ion (H⁻) to the electrophilic carbonyl carbon of the ketone. The hydride acts as a nucleophile, attacking the δ+ carbon of the C=O bond: the π bond breaks, oxygen takes both electrons (forming an alkoxide anion), and after aqueous workup, the alkoxide is protonated to give the alcohol. Since ketones have two R groups flanking the carbonyl carbon (R₂C=O), hydride addition produces a carbon bonded to two R groups and one OH — the defining structure of a secondary alcohol (R₂CHOH). K₂Cr₂O₇/H⁺ is an oxidant (would produce nothing from a ketone under mild conditions); Tollens' and PCl₅ have completely different functions."},

    {id:"b16",topic:"Biochemistry",text:"Which reagent identifies the presence of starch?",options:["A. Benedict's solution","B. Iodine solution","C. Fehling's solution","D. Tollens' reagent"],answer:"B",
    hint:"Iodine molecules physically enter the starch helix, forming a blue-black inclusion complex.",
    explanation:"Iodine solution (I₂/KI) turns deep blue-black in the presence of starch through formation of a physical inclusion complex — not a chemical reaction. Starch's amylose component forms a left-handed helix, and triiodide ions (I₃⁻, formed from I₂ and I⁻) thread into the central channel of the helix, creating a charge-transfer complex that absorbs strongly in the visible region (~580–640 nm), producing the dramatic blue-black colour. On heating, the helix uncoils, releasing the iodine and causing the colour to disappear — it returns on cooling. This thermal reversibility confirms the physical (non-covalent) nature of the complex. Benedict's and Fehling's detect reducing sugars; Tollens' detects aldehydes."},

    {id:"b17",topic:"Industry",text:"Cracking of alkanes is done to obtain:",options:["A. Higher alkanes","B. Shorter, more useful hydrocarbons","C. Alkenes only","D. Aromatic compounds"],answer:"B",
    hint:"Refineries crack heavy oil fractions to make the petrol-range and alkene feedstocks that industry needs.",
    explanation:"Cracking breaks large, long-chain alkane molecules (from heavy petroleum fractions) into smaller, more commercially valuable molecules. Thermal cracking (450–750°C) and catalytic cracking (zeolite catalysts, ~500°C) cleave C—C bonds homolytically or via carbocation intermediates, respectively. The products include shorter-chain alkanes suitable for petrol/gasoline, alkenes (monomers for polymers like polyethylene and polypropylene), and hydrogen gas. This process is industrially essential because crude petroleum contains more long-chain, high-boiling fractions than the market demands, while petrol-range (C₅–C₁₀) and alkene feedstocks are in high demand. Cracking bridges this gap and is the cornerstone of the modern petrochemical industry."},

    {id:"b18",topic:"Reactions",text:"CH₃Cl + KOH(aq) gives:",options:["A. CH₃OCH₃","B. CH₃OH","C. CH₂Cl₂","D. CH₃CN"],answer:"B",
    hint:"Aqueous KOH provides OH⁻ — a strong nucleophile that displaces Cl⁻ via SN2.",
    explanation:"In the reaction of chloromethane with aqueous KOH, hydroxide ion (OH⁻) acts as the nucleophile in an SN2 (bimolecular nucleophilic substitution) mechanism. OH⁻ attacks the back face of the electrophilic carbon bearing chlorine, simultaneously forming the new C—O bond as the C—Cl bond breaks and Cl⁻ departs as the leaving group. The product is methanol (CH₃OH). The use of aqueous KOH (OH⁻ as nucleophile) drives substitution; alcoholic KOH (in ethanol solvent) would instead promote elimination (E2) to give an alkene by abstracting a β-hydrogen. This aqueous vs. alcoholic KOH distinction is a classic mechanistic decision point tested in organic chemistry examinations."},

    {id:"b19",topic:"Polymers",text:"Which of the following is a condensation polymer?",options:["A. Polyethylene","B. Polystyrene","C. Nylon-6,6","D. PVC"],answer:"C",
    hint:"Condensation polymers release a small molecule (water or HCl) each time two monomers join.",
    explanation:"Nylon-6,6 is formed by condensation polymerisation between hexane-1,6-dioic acid (adipic acid, a bifunctional dicarboxylic acid) and hexane-1,6-diamine (a bifunctional diamine). Each time the —COOH of the acid reacts with the —NH₂ of the amine, a peptide-like amide bond (—CO—NH—) forms and one water molecule is released. The '6,6' designation indicates six carbons in each monomer. Nylon-6,6 is a polyamide with exceptionally strong intermolecular hydrogen bonding between N—H and C=O groups on adjacent chains, giving it high tensile strength. Polyethylene, polystyrene, and PVC are addition polymers — their monomers join directly via C=C bond opening with no by-product released."},

    {id:"b20",topic:"Oxidation",text:"Oxidation of a primary alcohol with excess acidified K₂Cr₂O₇ gives:",options:["A. Ketone","B. Ester","C. Carboxylic acid","D. Alkene"],answer:"C",
    hint:"Primary alcohols oxidise in two sequential steps — with excess oxidant, the second step proceeds fully.",
    explanation:"Primary alcohols (R—CH₂OH) undergo two-stage oxidation with acidified K₂Cr₂O₇ (H₂SO₄): first to an aldehyde (R—CHO), then further oxidation to a carboxylic acid (R—COOH). With excess oxidant, the aldehyde intermediate — which is more easily oxidised than the original alcohol — is converted completely to the carboxylic acid. To isolate the aldehyde, it must be distilled out of the reaction mixture as it forms before the excess oxidant can oxidise it further. Secondary alcohols oxidise to ketones only (no further oxidation possible under these conditions). Tertiary alcohols have no C—H bond at the hydroxyl carbon and resist oxidation by K₂Cr₂O₇ entirely."},

    {id:"b21",topic:"Nomenclature",text:"The empirical formula of benzene is:",options:["A. C₆H₆","B. CH₂","C. CH","D. C₂H₂"],answer:"C",
    hint:"Reduce C₆H₆ to the simplest whole-number ratio of carbon to hydrogen.",
    explanation:"The empirical formula expresses the simplest whole-number ratio of atoms. Benzene (C₆H₆) has a C:H ratio of 6:6 = 1:1, giving empirical formula CH. This illustrates why empirical formulae alone cannot identify a compound: ethyne (C₂H₂), benzene (C₆H₆), and many other compounds all share the same CH empirical formula. The molecular formula (requiring mass spectrometry), degree of unsaturation (DoU = 4 for benzene), and spectroscopic data are all needed to identify benzene uniquely. In combustion analysis, the empirical formula CH means equal masses of carbon and hydrogen (adjusted for atomic masses: C = 12, H = 1), giving 92.3% C and 7.7% H by mass."},

    {id:"b22",topic:"Reactions",text:"Ethanoic acid + ethanol (H₂SO₄ catalyst) gives:",options:["A. Diethyl ether","B. Ethyl ethanoate","C. Ethyl propanoate","D. Ethanal"],answer:"B",
    hint:"Ester name = alcohol-derived part first + acid-derived part: ethyl (from ethanol) + ethanoate (from ethanoic acid).",
    explanation:"Fischer esterification of ethanoic acid (CH₃COOH) with ethanol (C₂H₅OH) using H₂SO₄ catalyst produces ethyl ethanoate (CH₃COOC₂H₅) and water: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. H₂SO₄ acts as both catalyst (protonates the carbonyl oxygen, activating it toward nucleophilic attack) and dehydrating agent (absorbs water to drive the equilibrium toward ester formation). Ester nomenclature: the alkyl group from the alcohol (ethyl) comes first, followed by the acyl group from the acid (ethanoate). Ethyl ethanoate (ethyl acetate, bp 77°C) is a sweet-smelling ester used as a solvent in nail polish remover and paint — its pleasant aroma is characteristic of many fruit flavours."},

    {id:"b23",topic:"Polymers",text:"Vulcanisation of rubber involves:",options:["A. Adding plasticisers","B. Cross-linking with sulfur","C. Hydrogenation","D. Nitration"],answer:"B",
    hint:"Charles Goodyear accidentally discovered in 1839 that heating rubber with sulfur transformed its properties.",
    explanation:"Vulcanisation, discovered by Charles Goodyear in 1839, involves heating natural rubber (cis-polyisoprene) with sulfur (typically 1–8% by mass) at 140–180°C. Sulfur radicals attack the remaining C=C double bonds in the polyisoprene chains, forming covalent sulfur cross-links (—S— or —S—S— bridges) between adjacent polymer chains. These cross-links act as molecular anchors: when the rubber is stretched, the cross-links prevent the chains from sliding permanently past each other, causing the material to snap back to its original shape (elasticity). Vulcanised rubber is dramatically stronger, harder, more elastic, and more resistant to heat and chemicals than raw rubber. The sulfur content controls hardness: 1–3% gives soft elastic rubber; 30–50% gives the hard material called ebonite."},

    {id:"b24",topic:"Aromaticity",text:"The reagent used in Friedel-Crafts alkylation is:",options:["A. RCOCl + AlCl₃","B. RCl + AlCl₃","C. HNO₃ + H₂SO₄","D. SO₃ + H₂SO₄"],answer:"B",
    hint:"RCl alone is not electrophilic enough — AlCl₃ activates it by generating the carbocation R⁺.",
    explanation:"Friedel-Crafts alkylation introduces an alkyl group (R) onto a benzene ring. The alkyl halide (RCl) alone is not sufficiently electrophilic to attack the aromatic ring. AlCl₃ (a strong Lewis acid) coordinates with the chlorine of RCl, withdrawing electron density and generating a carbocation electrophile: RCl + AlCl₃ → R⁺[AlCl₄]⁻. This R⁺ (or the highly polarised δ+R—Cl—AlCl₃ complex) then attacks the benzene ring via EAS, restoring aromaticity and regenerating AlCl₃ (which is catalytic). RCOCl + AlCl₃ is used for Friedel-Crafts acylation (introduces R—CO— instead). Friedel-Crafts reactions are used industrially for synthesising ethylbenzene (→ styrene → polystyrene) and cumene (→ phenol + acetone)."},

    {id:"b25",topic:"Biochemistry",text:"'Denaturation' of a protein means:",options:["A. Digestion by enzymes","B. Loss of 3D structure due to heat or chemicals","C. Synthesis of new protein","D. Reduction of peptide bonds"],answer:"B",
    hint:"Denaturation disrupts non-covalent interactions — the primary structure (peptide bonds) remains intact.",
    explanation:"Protein denaturation is the disruption of a protein's three-dimensional structure — its secondary structure (α-helices, β-sheets maintained by hydrogen bonds), tertiary structure (overall folding maintained by hydrophobic interactions, disulfide bridges, ionic bonds, van der Waals forces), and quaternary structure (subunit assembly) — caused by heat, extremes of pH, organic solvents, heavy metal ions, or detergents. Crucially, denaturation does NOT break peptide bonds (the primary structure) — only strong acid/base hydrolysis or proteolytic enzymes can do that. The polypeptide chain unfolds into a random coil, losing its precise three-dimensional shape and therefore its biological activity (enzyme catalysis, hormone binding, structural function). Cooked egg white is the classic irreversible denaturation example."},
  ]
}
```

]
};

const fmt = s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
const calcScore = (section,ans)=>{
let c=0; section.questions.forEach(q=>{if(ans[q.id]===q.answer)c++;});
return{correct:c,total:section.questions.length,marks:c*4,max:section.questions.length*4,pct:Math.round((c*4)/(section.questions.length*4)*100)};
};
const gradeInfo = p=>p>=90?{g:“A”,l:“Distinction”,c:”#00d084”}:p>=75?{g:“B”,l:“Credit”,c:”#4f8ef7”}:p>=60?{g:“C”,l:“Good Pass”,c:”#a78bfa”}:p>=50?{g:“D”,l:“Pass”,c:”#f59e0b”}:{g:“F”,l:“Fail”,c:”#ef4444”};

function Confetti(){
const cols=[”#00d084”,”#4f8ef7”,”#f59e0b”,”#a78bfa”,”#ef4444”,”#fff”,”#fbbf24”];
return(
<div style={{position:“fixed”,inset:0,pointerEvents:“none”,overflow:“hidden”,zIndex:9999}}>
{Array.from({length:80},(_,i)=>{
const l=Math.random()*100,delay=Math.random()*3,dur=2+Math.random()*3,size=5+Math.random()*9,c=cols[i%cols.length],round=Math.random()>.5;
return<div key={i} style={{position:“absolute”,left:`${l}%`,top:-20,width:size,height:size,background:c,borderRadius:round?“50%”:“3px”,animation:`confettiFall ${dur}s ${delay}s ease-in both`}}/>;
})}
</div>
);
}

function DotTracker({questions,answers,currentIdx,onJump,color}){
return(
<div style={{display:“flex”,flexWrap:“wrap”,gap:7,justifyContent:“center”}}>
{questions.map((q,i)=>{
const ans=answers[q.id]!==undefined,cur=i===currentIdx;
return(
<button key={q.id} onClick={()=>onJump(i)} style={{width:32,height:32,borderRadius:“50%”,border:`2px solid ${cur?color:ans?color+"99":"#1e304a"}`,background:cur?color:ans?color+“28”:”#080f1c”,color:cur?”#000”:ans?color:”#2a3f5f”,fontSize:10,fontWeight:700,cursor:“pointer”,fontFamily:”‘JetBrains Mono’,monospace”,transition:“all .18s cubic-bezier(.4,0,.2,1)”,display:“flex”,alignItems:“center”,justifyContent:“center”,boxShadow:cur?`0 0 12px ${color}66`:“none”}}>{i+1}</button>
);
})}
</div>
);
}

function Instructions({onStart}){
return(
<div style={{minHeight:“100vh”,background:”#05090f”,color:”#ddeeff”,fontFamily:”‘Source Serif 4’,Georgia,serif”,padding:“32px 20px 60px”,display:“flex”,flexDirection:“column”,alignItems:“center”}}>
<style>{GLOBAL_CSS}</style>
<div style={{width:“100%”,maxWidth:500}}>
<div style={{background:“linear-gradient(135deg,#0a1e36,#0d2640)”,border:“1px solid #1a3050”,borderRadius:20,overflow:“hidden”,boxShadow:“0 24px 60px #000a”,marginBottom:24,animation:“fadeUp .6s ease both”}}>
<div style={{background:“linear-gradient(90deg,#00d08422,#4f8ef722,#00d08411)”,borderBottom:“1px solid #1a3050”,padding:“20px 24px”,display:“flex”,alignItems:“center”,gap:16}}>
<div style={{width:52,height:52,borderRadius:“50%”,background:“linear-gradient(135deg,#00d084,#007a4d)”,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:24,flexShrink:0,boxShadow:“0 4px 20px #00d08455”,animation:“glowPulse 3s ease-in-out infinite”}}>🎓</div>
<div>
<div style={{fontSize:10,letterSpacing:4,color:”#00d084”,fontFamily:”‘JetBrains Mono’,monospace”,textTransform:“uppercase”,marginBottom:3}}>University of Benin</div>
<div style={{fontSize:20,fontWeight:700,color:”#fff”,fontFamily:”‘Playfair Display’,serif”,lineHeight:1.2}}>Mock Examination Portal</div>
</div>
</div>
<div style={{padding:“14px 24px”,display:“flex”,gap:8,flexWrap:“wrap”}}>
{[[EXAM.course,”#00d084”],[EXAM.title,”#ddeeff”],[EXAM.level,”#7a9bbf”],[EXAM.session,”#7a9bbf”],[`${EXAM.durationMins} mins`,”#f59e0b”]].map(([v,c])=>(
<span key={v} style={{fontSize:12,color:c,background:”#ffffff0a”,border:“1px solid #ffffff12”,borderRadius:6,padding:“3px 10px”,fontFamily:”‘JetBrains Mono’,monospace”}}>{v}</span>
))}
</div>
</div>

```
    <div style={{background:"#080f1c",border:"1px solid #1a3050",borderRadius:18,overflow:"hidden",marginBottom:20,animation:"fadeUp .6s .1s ease both"}}>
      <div style={{padding:"14px 24px",borderBottom:"1px solid #1a3050",background:"#0a1525"}}>
        <div style={{fontSize:11,letterSpacing:3,color:"#00d084",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase"}}>📋 Instructions & Rules</div>
      </div>
      <div style={{padding:"20px 24px"}}>
        {[["⏱","Timer","Countdown timer pinned at top. Red alert fires at 10 minutes remaining."],["📂","Two Sections","Section A (25 Qs) then Section B (25 Qs). Complete A before B."],["🏆","Grading","4 marks per correct answer. 25 × 4 = 100 per section. 200 total shown as %."],["🚫","No Penalty","NO negative marking. Always attempt — even a guess is fine."],["💡","Hints","Every question has a hint. Tap 'Show Hint' if stuck."],["🔢","Navigation","Tap any dot to jump freely — no answer required to move."],["✅","Submit","Submit anytime. Unanswered questions score zero."],["🔁","Retakes","Up to 2 retakes (3 total attempts)."],["📊","Results","Wrong answers auto-expand showing your pick, correct answer, and full explanation."]].map(([icon,title,desc],i)=>(
          <div key={title} style={{display:"flex",gap:14,paddingBottom:14,marginBottom:14,borderBottom:i<8?"1px solid #0f1e30":"none"}}>
            <div style={{fontSize:18,flexShrink:0,width:24,textAlign:"center",marginTop:2}}>{icon}</div>
            <div>
              <div style={{fontSize:12,color:"#4f8ef7",fontFamily:"'JetBrains Mono',monospace",fontWeight:600,marginBottom:3}}>{title}</div>
              <div style={{fontSize:13,color:"#8aaac8",lineHeight:1.7}}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={{background:"#080f1c",border:"1px solid #1a3050",borderRadius:18,overflow:"hidden",marginBottom:32,animation:"fadeUp .6s .2s ease both"}}>
      <div style={{padding:"14px 24px",borderBottom:"1px solid #1a3050",background:"#0a1525"}}>
        <div style={{fontSize:11,letterSpacing:3,color:"#f59e0b",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase"}}>🏅 Grading Scale</div>
      </div>
      <div style={{padding:"20px 24px"}}>
        {[["90–100%","A — Distinction","#00d084"],["75–89%","B — Credit","#4f8ef7"],["60–74%","C — Good Pass","#a78bfa"],["50–59%","D — Pass","#f59e0b"],["0–49%","F — Fail","#ef4444"]].map(([range,g,c])=>(
          <div key={range} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:"1px solid #0f1e30"}}>
            <span style={{fontSize:13,color:"#6a88a8",fontFamily:"'JetBrains Mono',monospace"}}>{range}</span>
            <span style={{fontSize:13,color:c,fontWeight:700,background:`${c}18`,border:`1px solid ${c}44`,borderRadius:6,padding:"3px 12px",fontFamily:"'JetBrains Mono',monospace"}}>{g}</span>
          </div>
        ))}
      </div>
    </div>

    <button onClick={onStart} style={{width:"100%",padding:"18px 0",borderRadius:16,border:"none",background:"linear-gradient(135deg,#00d084,#007a4d)",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:2,boxShadow:"0 8px 32px #00d08444",animation:"fadeUp .6s .3s ease both"}}>
      BEGIN EXAMINATION →
    </button>
  </div>
</div>
```

);
}

function Transition({onBeginB}){
return(
<div style={{minHeight:“100vh”,background:”#05090f”,display:“flex”,alignItems:“center”,justifyContent:“center”,padding:“32px 20px”,fontFamily:”‘Source Serif 4’,Georgia,serif”}}>
<style>{GLOBAL_CSS}</style>
<div style={{width:“100%”,maxWidth:440,textAlign:“center”,animation:“fadeUp .5s ease both”}}>
<div style={{width:80,height:80,borderRadius:“50%”,background:“linear-gradient(135deg,#00d084,#007a4d)”,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:36,margin:“0 auto 20px”,boxShadow:“0 0 40px #00d08455”}}>✓</div>
<div style={{fontSize:10,letterSpacing:4,color:”#00d084”,fontFamily:”‘JetBrains Mono’,monospace”,textTransform:“uppercase”,marginBottom:10}}>Section A Complete</div>
<h2 style={{fontSize:26,fontWeight:700,color:”#fff”,fontFamily:”‘Playfair Display’,serif”,marginBottom:12}}>Section A Submitted</h2>
<p style={{fontSize:14,color:”#6a88a8”,lineHeight:1.8,marginBottom:36}}>Section A is done. Take a moment, then begin Section B — 25 more questions, 4 marks each, no negative marking.</p>
<div style={{background:”#080f1c”,border:“1px solid #1a304a”,borderRadius:16,padding:24,marginBottom:32}}>
<div style={{fontSize:10,letterSpacing:3,color:”#4f8ef7”,fontFamily:”‘JetBrains Mono’,monospace”,marginBottom:8}}>SECTION B</div>
<div style={{fontSize:22,fontWeight:700,color:”#fff”,fontFamily:”‘Playfair Display’,serif”}}>25 Questions · 100 Marks</div>
<div style={{fontSize:13,color:”#6a88a8”,marginTop:6}}>Organic Chemistry I · No negative marking</div>
</div>
<button onClick={onBeginB} style={{width:“100%”,padding:“17px 0”,borderRadius:14,border:“none”,background:“linear-gradient(135deg,#4f8ef7,#1d4ed8)”,color:”#fff”,fontSize:15,fontWeight:700,cursor:“pointer”,fontFamily:”‘JetBrains Mono’,monospace”,letterSpacing:2,boxShadow:“0 8px 32px #4f8ef744”}}>
BEGIN SECTION B →
</button>
</div>
</div>
);
}

function Exam({sectionIdx,onSubmit,totalSecs}){
const sec=EXAM.sections[sectionIdx],C=sec.color;
const [qi,setQi]=useState(0);
const [answers,setAnswers]=useState({});
const [hint,setHint]=useState(false);
const [secs,setSecs]=useState(totalSecs);
const [warn,setWarn]=useState(false);
const [confirm,setConfirm]=useState(false);
const [pressedOpt,setPressedOpt]=useState(null);
const warnRef=useRef(false);

useEffect(()=>{setHint(false);},[qi]);
useEffect(()=>{
const t=setInterval(()=>setSecs(s=>{
if(s<=1){clearInterval(t);onSubmit(answers);return 0;}
if(s===600&&!warnRef.current){warnRef.current=true;setWarn(true);setTimeout(()=>setWarn(false),6000);}
return s-1;
}),1000);
return()=>clearInterval(t);
},[]);

const q=sec.questions[qi];
const answered=Object.keys(answers).length;
const isLow=secs<600;

return(
<div style={{minHeight:“100vh”,background:”#05090f”,color:”#ddeeff”,fontFamily:”‘Source Serif 4’,Georgia,serif”,display:“flex”,flexDirection:“column”}}>
<style>{GLOBAL_CSS}</style>
{warn&&<div style={{position:“fixed”,top:0,left:0,right:0,zIndex:500,background:”#ef4444”,color:”#fff”,padding:“14px 20px”,textAlign:“center”,fontSize:13,fontWeight:700,fontFamily:”‘JetBrains Mono’,monospace”,letterSpacing:2,animation:“slideDown .35s ease”,boxShadow:“0 4px 20px #ef444488”}}>⚠ 10 MINUTES REMAINING — SUBMIT SOON</div>}
{confirm&&(
<div style={{position:“fixed”,inset:0,background:”#000000cc”,zIndex:400,display:“flex”,alignItems:“center”,justifyContent:“center”,padding:24,backdropFilter:“blur(8px)”}}>
<div style={{background:”#080f1c”,border:“1px solid #1a304a”,borderRadius:22,padding:32,maxWidth:360,width:“100%”,textAlign:“center”,animation:“fadeUp .3s ease”,boxShadow:“0 32px 80px #000a”}}>
<div style={{fontSize:40,marginBottom:14}}>📋</div>
<h3 style={{color:”#fff”,fontSize:18,fontFamily:”‘Playfair Display’,serif”,marginBottom:8}}>Submit {sec.label}?</h3>
<p style={{color:”#6a88a8”,fontSize:13,lineHeight:1.75,margin:“0 0 24px”}}>{answered<sec.questions.length?`You have ${sec.questions.length-answered} unanswered question${sec.questions.length-answered!==1?"s":""}. These will score zero.`:“All questions answered. Ready to submit?”}</p>
<div style={{display:“flex”,gap:10}}>
<button onClick={()=>setConfirm(false)} style={{flex:1,padding:14,borderRadius:12,border:“1.5px solid #1a304a”,background:“transparent”,color:”#6a88a8”,cursor:“pointer”,fontFamily:”‘JetBrains Mono’,monospace”,fontSize:13}}>Go Back</button>
<button onClick={()=>{setConfirm(false);onSubmit(answers);}} style={{flex:1,padding:14,borderRadius:12,border:“none”,background:`linear-gradient(135deg,${C},${sec.dark})`,color:sectionIdx===0?”#000”:”#fff”,cursor:“pointer”,fontFamily:”‘JetBrains Mono’,monospace”,fontSize:13,fontWeight:700}}>Submit ✓</button>
</div>
</div>
</div>
)}

```
  <div style={{position:"sticky",top:0,zIndex:100,background:"#05090fee",backdropFilter:"blur(16px)",borderBottom:"1px solid #0f1e30",padding:"12px 20px"}}>
    <div style={{maxWidth:500,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div><div style={{fontSize:9,letterSpacing:4,color:C,fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",marginBottom:2}}>Section {sec.id}</div><div style={{fontSize:14,color:"#c0d8f0",fontWeight:600}}>{EXAM.course}</div></div>
        <div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:isLow?"#ef4444":"#fff",fontFamily:"'JetBrains Mono',monospace",letterSpacing:3,animation:isLow?"pulse 1s ease-in-out infinite":"none"}}>{fmt(secs)}</div></div>
        <div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:700,color:C,fontFamily:"'JetBrains Mono',monospace"}}>{answered}<span style={{color:"#2a3f5f",fontSize:12}}>/{sec.questions.length}</span></div><div style={{fontSize:9,color:"#2a3f5f",letterSpacing:2,fontFamily:"'JetBrains Mono',monospace"}}>ANSWERED</div></div>
      </div>
      <div style={{background:"#0f1e30",borderRadius:99,height:3,overflow:"hidden"}}><div style={{width:`${(answered/sec.questions.length)*100}%`,height:"100%",background:`linear-gradient(90deg,${C},${C}88)`,transition:"width .4s",borderRadius:99}}/></div>
    </div>
  </div>

  <div style={{flex:1,padding:"20px 20px 40px",maxWidth:500,margin:"0 auto",width:"100%"}}>
    <div style={{background:"#080f1c",border:"1px solid #0f1e30",borderRadius:16,padding:"14px 16px",marginBottom:20}}>
      <div style={{fontSize:9,color:"#2a3f5f",letterSpacing:3,fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",marginBottom:10}}>Question Navigator</div>
      <DotTracker questions={sec.questions} answers={answers} currentIdx={qi} onJump={setQi} color={C}/>
    </div>

    <div style={{background:"#080f1c",border:`1px solid ${C}28`,borderRadius:20,overflow:"hidden",marginBottom:16,boxShadow:`0 8px 40px #000a,0 0 0 1px ${C}18`}}>
      <div style={{background:`linear-gradient(90deg,${C}18,transparent)`,borderBottom:"1px solid #0f1e30",padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:10,color:C,fontFamily:"'JetBrains Mono',monospace",letterSpacing:3,fontWeight:700}}>QUESTION {qi+1} / {sec.questions.length}</span>
        <div style={{display:"flex",gap:8}}>
          <span style={{fontSize:10,color:"#6a88a8",background:"#0f1e30",borderRadius:6,padding:"3px 10px",fontFamily:"'JetBrains Mono',monospace"}}>{q.topic}</span>
          <span style={{fontSize:10,color:"#f59e0b",background:"#f59e0b1a",border:"1px solid #f59e0b33",borderRadius:6,padding:"3px 10px",fontFamily:"'JetBrains Mono',monospace"}}>4 MARKS</span>
        </div>
      </div>
      <div style={{padding:"24px 20px 20px"}}>
        <p style={{fontSize:16,lineHeight:1.85,color:"#ddeeff",marginBottom:24,fontFamily:"'Source Serif 4',Georgia,serif"}}>{q.text}</p>
        {q.options.map(opt=>{
          const letter=opt[0],sel=answers[q.id]===letter,pressed=pressedOpt===letter;
          return(
            <button key={opt} onClick={()=>{setPressedOpt(letter);setTimeout(()=>setPressedOpt(null),250);setAnswers(p=>({...p,[q.id]:letter}));}} style={{width:"100%",textAlign:"left",padding:"14px 18px",marginBottom:10,borderRadius:14,border:`1.5px solid ${sel?C:"#0f2035"}`,background:sel?`${C}1a`:"#050d1a",color:sel?"#fff":"#7a9bbf",cursor:"pointer",transition:"all .18s",fontFamily:"'Source Serif 4',Georgia,serif",display:"flex",alignItems:"center",gap:14,transform:pressed?"scale(.97)":"scale(1)",boxShadow:sel?`0 4px 20px ${C}33`:"none"}}>
              <span style={{width:32,height:32,borderRadius:"50%",flexShrink:0,background:sel?C:"#0f2035",color:sel?"#000":"#2a4060",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",transition:"all .18s"}}>{letter}</span>
              <span style={{fontSize:14,lineHeight:1.6,flex:1}}>{opt.slice(3)}</span>
              {sel&&<span style={{fontSize:16}}>✓</span>}
            </button>
          );
        })}
        <div style={{marginTop:12}}>
          <button onClick={()=>setHint(h=>!h)} style={{background:"transparent",border:"1px solid #f59e0b44",borderRadius:8,color:"#f59e0b",fontSize:12,padding:"7px 16px",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:1}}>
            💡 {hint?"Hide Hint":"Show Hint"}
          </button>
          {hint&&<div style={{marginTop:12,padding:"14px 16px",background:"#f59e0b0d",border:"1px solid #f59e0b2a",borderRadius:12,fontSize:13,color:"#fcd34d",lineHeight:1.75,animation:"fadeUp .25s ease"}}>{q.hint}</div>}
        </div>
      </div>
    </div>

    <div style={{display:"flex",gap:10,marginBottom:14}}>
      {[["← Previous",()=>setQi(i=>Math.max(0,i-1)),qi===0],["Next →",()=>setQi(i=>Math.min(sec.questions.length-1,i+1)),qi===sec.questions.length-1]].map(([lbl,fn,dis])=>(
        <button key={lbl} onClick={fn} disabled={dis} style={{flex:1,padding:14,borderRadius:13,border:"1.5px solid #0f2035",background:"#080f1c",color:dis?"#1a2f45":"#6a88a8",cursor:dis?"not-allowed":"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:13}}>{lbl}</button>
      ))}
    </div>
    <button onClick={()=>setConfirm(true)} style={{width:"100%",padding:"17px 0",borderRadius:15,border:"none",background:`linear-gradient(135deg,${C},${sec.dark})`,color:sectionIdx===0?"#000":"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:1,boxShadow:`0 8px 28px ${C}44`}}>
      {sectionIdx===0?"Submit Section A & Continue →":"Submit Exam & View Results ✓"}
    </button>
  </div>
</div>
```

);
}

function QuestionReview({section,answers}){
const C=section.color;
const [expanded,setExpanded]=useState(()=>{
const s=new Set();
section.questions.forEach(q=>{ if(!answers[q.id]||answers[q.id]!==q.answer) s.add(q.id); });
return s;
});
const toggle=(id)=>setExpanded(prev=>{ const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });

return(
<div>
{section.questions.map((q,i)=>{
const userAns=answers[q.id],correct=userAns===q.answer,open=expanded.has(q.id);
return(
<div key={q.id} onClick={()=>toggle(q.id)} style={{background:”#080f1c”,border:`1px solid ${correct?"#00d08433":userAns?"#ef444433":"#ef444422"}`,borderRadius:16,padding:“16px 18px”,marginBottom:10,cursor:“pointer”,transition:“all .2s”}}>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“flex-start”,gap:10}}>
<div style={{flex:1}}>
<div style={{display:“flex”,gap:8,alignItems:“center”,flexWrap:“wrap”,marginBottom:8}}>
<span style={{fontSize:11,color:C,fontFamily:”‘JetBrains Mono’,monospace”,fontWeight:700}}>Q{i+1}</span>
<span style={{fontSize:15}}>{correct?“✅”:userAns?“❌”:“⬜”}</span>
<span style={{fontSize:10,color:”#4a6080”,background:”#0f1e30”,borderRadius:5,padding:“2px 8px”,fontFamily:”‘JetBrains Mono’,monospace”}}>{q.topic}</span>
{!userAns&&<span style={{fontSize:10,color:”#ef4444”,fontFamily:”‘JetBrains Mono’,monospace”}}>NOT ATTEMPTED</span>}
{userAns&&!correct&&<span style={{fontSize:10,color:”#ef4444”,fontFamily:”‘JetBrains Mono’,monospace”}}>INCORRECT</span>}
{correct&&<span style={{fontSize:10,color:”#00d084”,fontFamily:”‘JetBrains Mono’,monospace”}}>CORRECT +4</span>}
</div>
<p style={{fontSize:13,color:”#9ab8d8”,lineHeight:1.6,fontFamily:”‘Source Serif 4’,Georgia,serif”}}>{q.text}</p>
</div>
<span style={{color:”#1a304a”,fontSize:12,fontFamily:”‘JetBrains Mono’,monospace”,flexShrink:0,marginTop:2}}>{open?“▲”:“▼”}</span>
</div>
{open&&(
<div style={{marginTop:16,borderTop:“1px solid #0f1e30”,paddingTop:16,animation:“fadeUp .25s ease”}}>
<div style={{marginBottom:16}}>
{q.options.map(opt=>{
const letter=opt[0],isCorrect=letter===q.answer,isUser=letter===userAns;
return(
<div key={opt} style={{display:“flex”,alignItems:“center”,gap:12,padding:“10px 14px”,marginBottom:7,borderRadius:11,background:isCorrect?”#00d08418”:isUser&&!isCorrect?”#ef444418”:“transparent”,border:`1px solid ${isCorrect?"#00d08455":isUser&&!isCorrect?"#ef444455":"#0f2035"}`}}>
<span style={{width:28,height:28,borderRadius:“50%”,background:isCorrect?”#00d084”:isUser&&!isCorrect?”#ef4444”:”#0f1e30”,color:isCorrect||(isUser&&!isCorrect)?”#fff”:”#2a4060”,display:“inline-flex”,alignItems:“center”,justifyContent:“center”,fontSize:11,fontWeight:700,fontFamily:”‘JetBrains Mono’,monospace”,flexShrink:0}}>{letter}</span>
<span style={{fontSize:13,color:isCorrect?”#00d084”:isUser&&!isCorrect?”#ef4444”:”#4a6080”,flex:1,fontFamily:”‘Source Serif 4’,Georgia,serif”}}>{opt.slice(3)}</span>
{isCorrect&&<span style={{fontSize:10,color:”#00d084”,fontFamily:”‘JetBrains Mono’,monospace”,fontWeight:700,flexShrink:0}}>✓ CORRECT</span>}
{isUser&&!isCorrect&&<span style={{fontSize:10,color:”#ef4444”,fontFamily:”‘JetBrains Mono’,monospace”,fontWeight:700,flexShrink:0}}>✗ YOUR PICK</span>}
</div>
);
})}
</div>
<div style={{background:”#00d08410”,border:“1px solid #00d08430”,borderRadius:12,padding:“16px”,fontSize:13,color:”#a0d8c0”,lineHeight:1.85,fontFamily:”‘Source Serif 4’,Georgia,serif”}}>
<span style={{color:”#00d084”,fontWeight:700,fontFamily:”‘JetBrains Mono’,monospace”,fontSize:10,letterSpacing:2,display:“block”,marginBottom:8}}>WHY THIS ANSWER IS CORRECT</span>
{q.explanation}
</div>
</div>
)}
</div>
);
})}
</div>
);
}

function SectionSummary({section,answers}){
const s=calcScore(section,answers),gi=gradeInfo(s.pct),C=section.color;
const topics={};
section.questions.forEach(q=>{if(!topics[q.topic])topics[q.topic]={c:0,t:0};topics[q.topic].t++;if(answers[q.id]===q.answer)topics[q.topic].c++;});
return(
<div style={{background:”#080f1c”,border:`1px solid ${C}33`,borderRadius:20,overflow:“hidden”,marginBottom:10,boxShadow:`0 8px 32px #0008,0 0 0 1px ${C}18`}}>
<div style={{background:`linear-gradient(90deg,${C}22,transparent)`,borderBottom:“1px solid #0f1e30”,padding:“16px 22px”,display:“flex”,justifyContent:“space-between”,alignItems:“center”}}>
<div><div style={{fontSize:10,color:C,fontFamily:”‘JetBrains Mono’,monospace”,letterSpacing:3,marginBottom:3}}>{section.id}</div><div style={{fontSize:16,color:”#fff”,fontWeight:700,fontFamily:”‘Playfair Display’,serif”}}>{section.label}</div></div>
<div style={{textAlign:“right”}}><div style={{fontSize:32,fontWeight:900,color:gi.c,fontFamily:”‘Playfair Display’,serif”,lineHeight:1}}>{s.pct}%</div><div style={{fontSize:11,color:gi.c,fontFamily:”‘JetBrains Mono’,monospace”,fontWeight:700}}>Grade {gi.g}</div></div>
</div>
<div style={{padding:“18px 22px”}}>
<div style={{display:“flex”,gap:8,marginBottom:18}}>
{[[`${s.correct}/${s.total}`,“Correct”],[`${s.marks}/${s.max}`,“Marks”],[gi.l,“Grade”]].map(([v,l])=>(
<div key={l} style={{flex:1,background:”#050d1a”,border:“1px solid #0f1e30”,borderRadius:12,padding:“12px 10px”,textAlign:“center”}}>
<div style={{fontSize:14,fontWeight:700,color:”#fff”,fontFamily:”‘JetBrains Mono’,monospace”}}>{v}</div>
<div style={{fontSize:10,color:”#2a4060”,letterSpacing:1,fontFamily:”‘JetBrains Mono’,monospace”,marginTop:3}}>{l}</div>
</div>
))}
</div>
<div style={{fontSize:10,color:”#2a4060”,letterSpacing:3,fontFamily:”‘JetBrains Mono’,monospace”,marginBottom:12,textTransform:“uppercase”}}>Topic Breakdown</div>
{Object.entries(topics).sort((a,b)=>(a[1].c/a[1].t)-(b[1].c/b[1].t)).map(([topic,{c,t}])=>{
const tp=Math.round((c/t)*100),tc=tp>=80?”#00d084”:tp>=50?”#f59e0b”:”#ef4444”;
return(
<div key={topic} style={{marginBottom:10}}>
<div style={{display:“flex”,justifyContent:“space-between”,marginBottom:5}}>
<span style={{fontSize:12,color:”#6a88a8”,fontFamily:”‘Source Serif 4’,Georgia,serif”}}>{topic}</span>
<span style={{fontSize:11,color:tc,fontFamily:”‘JetBrains Mono’,monospace”,fontWeight:700}}>{c}/{t} ({tp}%)</span>
</div>
<div style={{background:”#0f1e30”,borderRadius:99,height:4,overflow:“hidden”}}><div style={{width:`${tp}%`,height:“100%”,background:tc,borderRadius:99,transition:“width .8s”}}/></div>
</div>
);
})}
</div>
</div>
);
}

function Results({sA_ans,sB_ans,attempts,maxAttempts,history,onRetry}){
const sAData=EXAM.sections[0],sBData=EXAM.sections[1];
const sA=calcScore(sAData,sA_ans),sB=calcScore(sBData,sB_ans);
const totalMarks=sA.marks+sB.marks,totalMax=sA.max+sB.max;
const totalPct=Math.round((totalMarks/totalMax)*100);
const gi=gradeInfo(totalPct);
const attemptsLeft=maxAttempts-attempts;

return(
<div style={{minHeight:“100vh”,background:”#05090f”,color:”#ddeeff”,fontFamily:”‘Source Serif 4’,Georgia,serif”,padding:“28px 20px 80px”,display:“flex”,flexDirection:“column”,alignItems:“center”}}>
<style>{GLOBAL_CSS}</style>
{totalPct>=70&&<Confetti/>}
<div style={{width:“100%”,maxWidth:500}}>

```
    {/* Overall */}
    <div style={{background:"#080f1c",border:`1px solid ${gi.c}44`,borderRadius:22,overflow:"hidden",marginBottom:24,boxShadow:`0 24px 60px #000a,0 0 0 1px ${gi.c}22`,animation:"fadeUp .5s ease both"}}>
      <div style={{background:`linear-gradient(135deg,${gi.c}18,transparent)`,padding:"32px 24px",textAlign:"center",borderBottom:"1px solid #0f1e30"}}>
        <div style={{fontSize:10,letterSpacing:4,color:"#2a4060",fontFamily:"'JetBrains Mono',monospace",marginBottom:10}}>OVERALL RESULT</div>
        <div style={{fontSize:80,fontWeight:900,color:gi.c,fontFamily:"'Playfair Display',serif",lineHeight:1,textShadow:`0 0 60px ${gi.c}55`,animation:"countUp .6s ease both"}}>{totalPct}%</div>
        <div style={{fontSize:11,color:gi.c,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,letterSpacing:3,marginTop:8}}>GRADE {gi.g} — {gi.l.toUpperCase()}</div>
        <div style={{fontSize:13,color:"#4a6080",marginTop:6,fontFamily:"'JetBrains Mono',monospace"}}>{totalMarks} / {totalMax} marks</div>
      </div>
      <div style={{display:"flex"}}>
        {[[sAData,sA],[sBData,sB]].map(([sec,s],i)=>{
          const g=gradeInfo(s.pct);
          return(
            <div key={sec.id} style={{flex:1,padding:"18px 16px",textAlign:"center",borderRight:i===0?"1px solid #0f1e30":"none"}}>
              <div style={{fontSize:10,color:sec.color,letterSpacing:2,fontFamily:"'JetBrains Mono',monospace",marginBottom:6}}>SECTION {sec.id}</div>
              <div style={{fontSize:24,fontWeight:700,color:"#fff",fontFamily:"'Playfair Display',serif"}}>{s.pct}%</div>
              <div style={{fontSize:12,color:g.c,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,marginTop:2}}>Grade {g.g}</div>
              <div style={{fontSize:11,color:"#2a4060",fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>{s.marks}/{s.max} marks</div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Top redo */}
    {attemptsLeft>0&&<button onClick={onRetry} style={{width:"100%",padding:"17px 0",borderRadius:15,border:"none",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#000",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:2,marginBottom:24,boxShadow:"0 8px 28px #f59e0b44",animation:"fadeUp .5s .1s ease both"}}>🔁 REDO EXAM ({attemptsLeft} attempt{attemptsLeft!==1?"s":""} remaining)</button>}

    {/* History */}
    {history.length>1&&(
      <div style={{background:"#080f1c",border:"1px solid #0f1e30",borderRadius:18,padding:"20px 22px",marginBottom:24,animation:"fadeUp .5s .15s ease both"}}>
        <div style={{fontSize:10,letterSpacing:3,color:"#f59e0b",fontFamily:"'JetBrains Mono',monospace",marginBottom:16,textTransform:"uppercase"}}>📈 Attempt Progress</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:8,height:70,marginBottom:10}}>
          {history.map((h,i)=>{const barH=Math.max(8,(h/100)*70),c=h>=70?"#00d084":h>=50?"#f59e0b":"#ef4444";return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}><span style={{fontSize:11,color:c,fontFamily:"'JetBrains Mono',monospace",fontWeight:700}}>{h}%</span><div style={{width:"100%",height:barH,background:`linear-gradient(180deg,${c},${c}88)`,borderRadius:"5px 5px 0 0"}}/></div>);})}
        </div>
        <div style={{display:"flex",gap:8}}>{history.map((_,i)=><div key={i} style={{flex:1,textAlign:"center",fontSize:9,color:"#1a304a",fontFamily:"'JetBrains Mono',monospace",letterSpacing:1}}>TRY {i+1}</div>)}</div>
      </div>
    )}

    {/* Section A review */}
    <div style={{animation:"fadeUp .5s .2s ease both"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <div style={{flex:1,height:1,background:"linear-gradient(90deg,#00d08444,transparent)"}}/>
        <div style={{fontSize:10,color:"#00d084",fontFamily:"'JetBrains Mono',monospace",letterSpacing:4,textTransform:"uppercase",flexShrink:0}}>Section A — Review</div>
        <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,#00d08444)"}}/>
      </div>
      <SectionSummary section={sAData} answers={sA_ans}/>
      <div style={{marginTop:14}}><QuestionReview section={sAData} answers={sA_ans}/></div>
    </div>

    {/* Section B review */}
    <div style={{marginTop:32,animation:"fadeUp .5s .3s ease both"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <div style={{flex:1,height:1,background:"linear-gradient(90deg,#4f8ef744,transparent)"}}/>
        <div style={{fontSize:10,color:"#4f8ef7",fontFamily:"'JetBrains Mono',monospace",letterSpacing:4,textTransform:"uppercase",flexShrink:0}}>Section B — Review</div>
        <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,#4f8ef744)"}}/>
      </div>
      <SectionSummary section={sBData} answers={sB_ans}/>
      <div style={{marginTop:14}}><QuestionReview section={sBData} answers={sB_ans}/></div>
    </div>

    {/* Final combined recap */}
    <div style={{marginTop:40,animation:"fadeUp .5s .4s ease both"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <div style={{flex:1,height:1,background:"linear-gradient(90deg,#ffffff22,transparent)"}}/>
        <div style={{fontSize:10,color:"#ffffff88",fontFamily:"'JetBrains Mono',monospace",letterSpacing:4,textTransform:"uppercase",flexShrink:0}}>Final Summary</div>
        <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,#ffffff22)"}}/>
      </div>
      <div style={{background:"#080f1c",border:`1px solid ${gi.c}44`,borderRadius:22,overflow:"hidden",boxShadow:`0 16px 50px #000a,0 0 0 1px ${gi.c}18`}}>
        <div style={{padding:"18px 22px",borderBottom:"1px solid #0f1e30",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:"#00d084",boxShadow:"0 0 8px #00d08466"}}/>
            <div><div style={{fontSize:10,color:"#00d084",fontFamily:"'JetBrains Mono',monospace",letterSpacing:2}}>SECTION A</div><div style={{fontSize:13,color:"#9ab8d8",marginTop:2}}>{sA.correct} correct · {sA.marks} marks</div></div>
          </div>
          <div style={{textAlign:"right"}}><div style={{fontSize:26,fontWeight:700,color:"#00d084",fontFamily:"'Playfair Display',serif"}}>{sA.pct}%</div><div style={{fontSize:10,color:gradeInfo(sA.pct).c,fontFamily:"'JetBrains Mono',monospace"}}>Grade {gradeInfo(sA.pct).g}</div></div>
        </div>
        <div style={{padding:"18px 22px",borderBottom:"1px solid #0f1e30",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:"#4f8ef7",boxShadow:"0 0 8px #4f8ef766"}}/>
            <div><div style={{fontSize:10,color:"#4f8ef7",fontFamily:"'JetBrains Mono',monospace",letterSpacing:2}}>SECTION B</div><div style={{fontSize:13,color:"#9ab8d8",marginTop:2}}>{sB.correct} correct · {sB.marks} marks</div></div>
          </div>
          <div style={{textAlign:"right"}}><div style={{fontSize:26,fontWeight:700,color:"#4f8ef7",fontFamily:"'Playfair Display',serif"}}>{sB.pct}%</div><div style={{fontSize:10,color:gradeInfo(sB.pct).c,fontFamily:"'JetBrains Mono',monospace"}}>Grade {gradeInfo(sB.pct).g}</div></div>
        </div>
        <div style={{height:4,background:"linear-gradient(90deg,#00d08444,#4f8ef744)"}}/>
        <div style={{padding:"28px 22px",textAlign:"center",background:`linear-gradient(160deg,${gi.c}0f,transparent)`}}>
          <div style={{fontSize:10,letterSpacing:4,color:"#2a4060",fontFamily:"'JetBrains Mono',monospace",marginBottom:12}}>COMBINED TOTAL</div>
          <div style={{display:"flex",justifyContent:"center",gap:24,marginBottom:16}}>
            {[["Marks",`${totalMarks}/${totalMax}`,"#fff"],["Score",`${totalPct}%`,gi.c],["Grade",gi.g,gi.c]].map(([l,v,c])=>(
              <div key={l}><div style={{fontSize:13,color:"#4a6080",fontFamily:"'JetBrains Mono',monospace"}}>{l}</div><div style={{fontSize:28,fontWeight:700,color:c,fontFamily:"'Playfair Display',serif"}}>{v}</div></div>
            ))}
          </div>
          <div style={{fontSize:13,color:gi.c,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,letterSpacing:2,background:`${gi.c}18`,border:`1px solid ${gi.c}44`,borderRadius:8,padding:"8px 20px",display:"inline-block"}}>{gi.l.toUpperCase()}</div>
        </div>
      </div>
    </div>

    {/* Bottom redo */}
    <div style={{marginTop:28}}>
      {attemptsLeft>0?<button onClick={onRetry} style={{width:"100%",padding:"17px 0",borderRadius:15,border:"none",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#000",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:2,boxShadow:"0 8px 28px #f59e0b44"}}>🔁 REDO EXAM ({attemptsLeft} attempt{attemptsLeft!==1?"s":""} remaining)</button>:<div style={{textAlign:"center",fontSize:12,color:"#1a304a",fontFamily:"'JetBrains Mono',monospace",letterSpacing:2}}>ALL ATTEMPTS USED</div>}
    </div>
  </div>
</div>
```

);
}

export default function App(){
const MAX=3;
const [screen,setScreen]=useState(“instructions”);
const [secIdx,setSecIdx]=useState(0);
const [sA_ans,setSA_ans]=useState({});
const [sB_ans,setSB_ans]=useState({});
const [attempts,setAttempts]=useState(0);
const [history,setHistory]=useState([]);

const startExam=()=>{setAttempts(a=>a+1);setSecIdx(0);setSA_ans({});setSB_ans({});setScreen(“exam”);};
const submitA=(ans)=>{setSA_ans(ans);setScreen(“transition”);};
const submitAll=(ans)=>{
setSB_ans(ans);
const sA=calcScore(EXAM.sections[0],sA_ans),sB=calcScore(EXAM.sections[1],ans);
setHistory(h=>[…h,Math.round(((sA.marks+sB.marks)/(sA.max+sB.max))*100)]);
setScreen(“results”);
};

if(screen===“instructions”) return<Instructions onStart={startExam}/>;
if(screen===“exam”) return<Exam key={`${attempts}-${secIdx}`} sectionIdx={secIdx} onSubmit={secIdx===0?submitA:submitAll} totalSecs={EXAM.durationMins*60}/>;
if(screen===“transition”) return<Transition onBeginB={()=>{setSecIdx(1);setScreen(“exam”);}}/>;
if(screen===“results”) return<Results sA_ans={sA_ans} sB_ans={sB_ans} attempts={attempts} maxAttempts={MAX} history={history} onRetry={()=>setScreen(“instructions”)}/>;
return null;
}
