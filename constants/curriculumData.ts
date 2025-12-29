// NCERT Curriculum Data Structure
// Classes 1-12+ with all subjects, chapters, and topics

export interface Topic {
  id: string;
  title: string;
  description?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  chapters: Chapter[];
}

export interface Pathway {
  id: string;
  name: string;
  icon: string;
  description: string;
  categories: {
    id: string;
    name: string;
    courses: {
      id: string;
      title: string;
      description?: string;
    }[];
  }[];
}

export interface Curriculum {
  subjects: Subject[];
  pathways?: Pathway[];
}

// Classes 1-5: Primary School Subjects
const primarySchoolSubjects: Subject[] = [
  {
    id: 'english-primary',
    name: 'English',
    icon: '📚',
    chapters: [
      {
        id: 'eng-1',
        number: 1,
        title: 'Merry Go Round',
        topics: [
          { id: 'eng-1-1', title: 'The Fun They Had', description: 'Reading comprehension and vocabulary' },
          { id: 'eng-1-2', title: 'The Road Not Taken', description: 'Poetry analysis' },
          { id: 'eng-1-3', title: 'My Childhood', description: 'Essay writing practice' },
        ],
      },
      {
        id: 'eng-2',
        number: 2,
        title: 'The Snake and the Mirror',
        topics: [
          { id: 'eng-2-1', title: 'Story Reading', description: 'Understanding the narrative' },
          { id: 'eng-2-2', title: 'Vocabulary Building', description: 'New words and meanings' },
          { id: 'eng-2-3', title: 'Character Sketch', description: 'Analyzing characters' },
        ],
      },
      {
        id: 'eng-3',
        number: 3,
        title: 'The Lady, or the Tiger?',
        topics: [
          { id: 'eng-3-1', title: 'Plot Analysis', description: 'Understanding the climax' },
          { id: 'eng-3-2', title: 'Creative Writing', description: 'Alternate endings' },
        ],
      },
    ],
  },
  {
    id: 'hindi-primary',
    name: 'Hindi',
    icon: 'हिंदी',
    chapters: [
      {
        id: 'hin-1',
        number: 1,
        title: 'वसंत (Spring)',
        topics: [
          { id: 'hin-1-1', title: 'कविता पठन', description: 'Poem recitation and meaning' },
          { id: 'hin-1-2', title: 'शब्द भंडार', description: 'Vocabulary enhancement' },
        ],
      },
      {
        id: 'hin-2',
        number: 2,
        title: 'बालम गुरु करम (Child is the Teacher)',
        topics: [
          { id: 'hin-2-1', title: 'गद्य पठन', description: 'Prose reading and understanding' },
          { id: 'hin-2-2', title: 'व्याकरण', description: 'Grammar exercises' },
        ],
      },
    ],
  },
  {
    id: 'maths-primary',
    name: 'Mathematics',
    icon: '🔢',
    chapters: [
      {
        id: 'math-1',
        number: 1,
        title: 'Numbers',
        topics: [
          { id: 'math-1-1', title: 'Counting 1-100', description: 'Learning to count' },
          { id: 'math-1-2', title: 'Place Value', description: 'Understanding ones and tens' },
          { id: 'math-1-3', title: 'Comparing Numbers', description: 'Greater than, less than' },
        ],
      },
      {
        id: 'math-2',
        number: 2,
        title: 'Addition & Subtraction',
        topics: [
          { id: 'math-2-1', title: 'Single Digit Addition', description: 'Basic addition facts' },
          { id: 'math-2-2', title: 'Two Digit Addition', description: 'Addition with carrying' },
          { id: 'math-2-3', title: 'Subtraction', description: 'Borrowing concepts' },
        ],
      },
      {
        id: 'math-3',
        number: 3,
        title: 'Multiplication',
        topics: [
          { id: 'math-3-1', title: 'Times Tables 1-10', description: 'Memorizing multiplication' },
          { id: 'math-3-2', title: 'Word Problems', description: 'Real-world applications' },
        ],
      },
    ],
  },
  {
    id: 'evs-primary',
    name: 'EVS',
    icon: '🌿',
    chapters: [
      {
        id: 'evs-1',
        number: 1,
        title: 'Family and Friends',
        topics: [
          { id: 'evs-1-1', title: 'My Family', description: 'Understanding family bonds' },
          { id: 'evs-1-2', title: 'Food We Eat', description: 'Healthy eating habits' },
        ],
      },
      {
        id: 'evs-2',
        number: 2,
        title: 'Water and Weather',
        topics: [
          { id: 'evs-2-1', title: 'Sources of Water', description: 'Rivers, lakes, and more' },
          { id: 'evs-2-2', title: 'Weather Patterns', description: 'Seasons and climate' },
        ],
      },
      {
        id: 'evs-3',
        number: 3,
        title: 'Plants and Animals',
        topics: [
          { id: 'evs-3-1', title: 'Types of Plants', description: 'Trees, shrubs, herbs' },
          { id: 'evs-3-2', title: 'Animal Habitats', description: 'Where animals live' },
        ],
      },
    ],
  },
];

// Classes 6-10: Middle and High School Subjects
const middleSchoolSubjects: Subject[] = [
  {
    id: 'english-middle',
    name: 'English',
    icon: '📖',
    chapters: [
      {
        id: 'eng-ms-1',
        number: 1,
        title: 'A Letter to God',
        topics: [
          { id: 'eng-ms-1-1', title: 'Summary', description: 'Chapter summary and themes' },
          { id: 'eng-ms-1-2', title: 'Character Analysis', description: 'Understanding Lencho' },
          { id: 'eng-ms-1-3', title: 'Question Answers', description: 'NCERT questions and answers' },
          { id: 'eng-ms-1-4', title: 'Grammar: Reported Speech', description: 'Learning reported speech' },
        ],
      },
      {
        id: 'eng-ms-2',
        number: 2,
        title: 'Dust of Snow',
        topics: [
          { id: 'eng-ms-2-1', title: 'Poem Analysis', description: 'Understanding the metaphor' },
          { id: 'eng-ms-2-2', title: 'Poetic Devices', description: 'Imagery and symbolism' },
        ],
      },
      {
        id: 'eng-ms-3',
        number: 3,
        title: 'Fire and Ice',
        topics: [
          { id: 'eng-ms-3-1', title: 'Summary', description: 'Robert Frost poem analysis' },
          { id: 'eng-ms-3-2', title: 'Themes', description: 'Destruction and desire' },
        ],
      },
      {
        id: 'eng-ms-4',
        number: 4,
        title: 'The Tale of Custard the Dragon',
        topics: [
          { id: 'eng-ms-4-1', title: 'Summary', description: 'Fun poem summary' },
          { id: 'eng-ms-4-2', title: 'Character Sketch', description: 'Custard the dragon' },
        ],
      },
      {
        id: 'eng-ms-5',
        number: 5,
        title: 'For Anne Gregory',
        topics: [
          { id: 'eng-ms-5-1', title: 'Poem Analysis', description: 'Love and appearance' },
          { id: 'eng-ms-5-2', title: 'Question Answers', description: 'NCERT solutions' },
        ],
      },
    ],
  },
  {
    id: 'hindi-middle',
    name: 'Hindi',
    icon: 'हिंदी',
    chapters: [
      {
        id: 'hin-ms-1',
        number: 1,
        title: 'धूल (Dust)',
        topics: [
          { id: 'hin-ms-1-1', title: 'कविता अर्थ', description: 'Poem meaning and interpretation' },
          { id: 'hin-ms-1-2', title: 'कवि परिचय', description: 'About the poet' },
        ],
      },
      {
        id: 'hin-ms-2',
        number: 2,
        title: 'दुःख का अधिकार (Right to Sorrow)',
        topics: [
          { id: 'hin-ms-2-1', title: 'पाठ सार', description: 'Chapter summary' },
          { id: 'hin-ms-2-2', title: 'प्रश्न उत्तर', description: 'Question answers' },
        ],
      },
      {
        id: 'hin-ms-3',
        number: 3,
        title: 'अब कहाँ दूसरे के दुख से दुखी होने वाले (Where are those who grieve)',
        topics: [
          { id: 'hin-ms-3-1', title: 'पाठ विश्लेषण', description: 'Text analysis' },
          { id: 'hin-ms-3-2', title: 'व्याकरण', description: 'Grammar exercises' },
        ],
      },
    ],
  },
  {
    id: 'maths-middle',
    name: 'Mathematics',
    icon: '📐',
    chapters: [
      {
        id: 'math-ms-1',
        number: 1,
        title: 'Real Numbers',
        topics: [
          { id: 'math-ms-1-1', title: 'Euclid\'s Division Lemma', description: 'Fundamental theorem' },
          { id: 'math-ms-1-2', title: 'Fundamental Theorem of Arithmetic', description: 'Prime factorization' },
          { id: 'math-ms-1-3', title: 'Rational Numbers', description: 'Understanding rationals' },
          { id: 'math-ms-1-4', title: 'Decimal Expansion', description: 'Non-terminating decimals' },
        ],
      },
      {
        id: 'math-ms-2',
        number: 2,
        title: 'Polynomials',
        topics: [
          { id: 'math-ms-2-1', title: 'Types of Polynomials', description: 'Degree and classification' },
          { id: 'math-ms-2-2', title: 'Zeroes of Polynomials', description: 'Finding roots' },
          { id: 'math-ms-2-3', title: 'Relationship between Zeroes and Coefficients', description: 'Sum and product' },
          { id: 'math-ms-2-4', title: 'Division Algorithm', description: 'Polynomial division' },
        ],
      },
      {
        id: 'math-ms-3',
        number: 3,
        title: 'Pair of Linear Equations',
        topics: [
          { id: 'math-ms-3-1', title: 'Graphical Method', description: 'Solving by graphs' },
          { id: 'math-ms-3-2', title: 'Substitution Method', description: 'Step by step solving' },
          { id: 'math-ms-3-3', title: 'Elimination Method', description: 'Elimination technique' },
          { id: 'math-ms-3-4', title: 'Cross Multiplication', description: 'Formula method' },
        ],
      },
      {
        id: 'math-ms-4',
        number: 4,
        title: 'Quadratic Equations',
        topics: [
          { id: 'math-ms-4-1', title: 'Standard Form', description: 'ax² + bx + c = 0' },
          { id: 'math-ms-4-2', title: 'Factorization Method', description: 'Solving by factors' },
          { id: 'math-ms-4-3', title: 'Quadratic Formula', description: 'Using discriminant' },
        ],
      },
      {
        id: 'math-ms-5',
        number: 5,
        title: 'Arithmetic Progression',
        topics: [
          { id: 'math-ms-5-1', title: 'nth Term', description: 'Finding general term' },
          { id: 'math-ms-5-2', title: 'Sum of AP', description: 'Sum formula' },
        ],
      },
    ],
  },
  {
    id: 'science-middle',
    name: 'Science',
    icon: '🔬',
    chapters: [
      {
        id: 'sci-ms-1',
        number: 1,
        title: 'Chemical Reactions',
        topics: [
          { id: 'sci-ms-1-1', title: 'Types of Reactions', description: 'Combination, decomposition' },
          { id: 'sci-ms-1-2', title: 'Oxidation', description: 'Rusting and burning' },
          { id: 'sci-ms-1-3', title: 'Balancing Equations', description: 'Chemical equation rules' },
        ],
      },
      {
        id: 'sci-ms-2',
        number: 2,
        title: 'Acids and Bases',
        topics: [
          { id: 'sci-ms-2-1', title: 'Properties of Acids', description: 'Sour taste, litmus test' },
          { id: 'sci-ms-2-2', title: 'Properties of Bases', description: 'Soapy, bitter taste' },
          { id: 'sci-ms-2-3', title: 'pH Scale', description: 'Measuring acidity' },
        ],
      },
      {
        id: 'sci-ms-3',
        number: 3,
        title: 'Metals and Non-metals',
        topics: [
          { id: 'sci-ms-3-1', title: 'Physical Properties', description: 'Lustre, malleability' },
          { id: 'sci-ms-3-2', title: 'Chemical Properties', description: 'Reactivity series' },
          { id: 'sci-ms-3-3', title: 'Ionic Compounds', description: 'Formation of salts' },
        ],
      },
      {
        id: 'sci-ms-4',
        number: 4,
        title: 'Carbon Compounds',
        topics: [
          { id: 'sci-ms-4-1', title: 'Covalent Bonding', description: 'Sharing electrons' },
          { id: 'sci-ms-4-2', title: 'Functional Groups', description: 'Hydroxyl, carbonyl' },
          { id: 'sci-ms-4-3', title: 'Organic Chemistry Basics', description: 'Hydrocarbons' },
        ],
      },
      {
        id: 'sci-ms-5',
        number: 5,
        title: 'Periodic Classification',
        topics: [
          { id: 'sci-ms-5-1', title: 'Modern Periodic Table', description: '18 groups, 7 periods' },
          { id: 'sci-ms-5-2', title: 'Trends in Properties', description: 'Atomic size, electronegativity' },
        ],
      },
    ],
  },
  {
    id: 'social-middle',
    name: 'Social Science',
    icon: '🌍',
    chapters: [
      {
        id: 'sst-ms-1',
        number: 1,
        title: 'The French Revolution',
        topics: [
          { id: 'sst-ms-1-1', title: 'Causes of Revolution', description: 'Social inequality' },
          { id: 'sst-ms-1-2', title: 'Important Events', description: 'Storming of Bastille' },
          { id: 'sst-ms-1-3', title: 'Outcomes', description: 'End of monarchy' },
        ],
      },
      {
        id: 'sst-ms-2',
        number: 2,
        title: 'Socialism in Europe',
        topics: [
          { id: 'sst-ms-2-1', title: 'Rise of Socialism', description: 'Industrial revolution impact' },
          { id: 'sst-ms-2-2', title: 'Russian Revolution', description: '1917 revolution' },
        ],
      },
      {
        id: 'sst-ms-3',
        number: 3,
        title: 'Nazism and the Rise of Hitler',
        topics: [
          { id: 'sst-ms-3-1', title: 'Weimar Republic', description: 'Germany after WWI' },
          { id: 'sst-ms-3-2', title: 'Nazi Party', description: 'Hitler\'s rise to power' },
        ],
      },
      {
        id: 'sst-ms-4',
        number: 4,
        title: 'Forest Society and Colonialism',
        topics: [
          { id: 'sst-ms-4-1', title: 'Deforestation', description: 'Impact of colonization' },
          { id: 'sst-ms-4-2', title: 'Resistance Movements', description: 'Forest dwellers' },
        ],
      },
      {
        id: 'sst-ms-5',
        number: 5,
        title: 'Pastoralists in the Modern World',
        topics: [
          { id: 'sst-ms-5-1', title: 'Nomadic Societies', description: 'Gaddis and Gujjars' },
          { id: 'sst-ms-5-2', title: 'Changes in Pastoralism', description: 'Modern challenges' },
        ],
      },
    ],
  },
];

// Science Stream Subjects (Classes 11-12)
const scienceStreamSubjects: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    chapters: [
      {
        id: 'phy-11-1',
        number: 1,
        title: 'Physical World',
        topics: [
          { id: 'phy-11-1-1', title: 'What is Physics?', description: 'Scope and excitement' },
          { id: 'phy-11-1-2', title: 'Fundamental Forces', description: 'Nature laws' },
          { id: 'phy-11-1-3', title: 'Physics and Technology', description: 'Applications' },
        ],
      },
      {
        id: 'phy-11-2',
        number: 2,
        title: 'Units and Measurements',
        topics: [
          { id: 'phy-11-2-1', title: 'SI Units', description: 'International system' },
          { id: 'phy-11-2-2', title: 'Significant Figures', description: 'Precision measurement' },
          { id: 'phy-11-2-3', title: 'Errors in Measurement', description: 'Accuracy and precision' },
        ],
      },
      {
        id: 'phy-11-3',
        number: 3,
        title: 'Motion in a Straight Line',
        topics: [
          { id: 'phy-11-3-1', title: 'Position, Path Length', description: 'Kinematics basics' },
          { id: 'phy-11-3-2', title: 'Velocity and Speed', description: 'Scalar vs vector' },
          { id: 'phy-11-3-3', title: 'Acceleration', description: 'Rate of change' },
        ],
      },
      {
        id: 'phy-11-4',
        number: 4,
        title: 'Motion in a Plane',
        topics: [
          { id: 'phy-11-4-1', title: 'Scalars and Vectors', description: 'Vector operations' },
          { id: 'phy-11-4-2', title: 'Projectile Motion', description: 'Parabolic path' },
          { id: 'phy-11-4-3', title: 'Uniform Circular Motion', description: 'Centripetal force' },
        ],
      },
      {
        id: 'phy-11-5',
        number: 5,
        title: 'Laws of Motion',
        topics: [
          { id: 'phy-11-5-1', title: 'Newton\'s First Law', description: 'Inertia' },
          { id: 'phy-11-5-2', title: 'Newton\'s Second Law', description: 'F = ma' },
          { id: 'phy-11-5-3', title: 'Newton\'s Third Law', description: 'Action-reaction' },
        ],
      },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    chapters: [
      {
        id: 'chem-11-1',
        number: 1,
        title: 'Some Basic Concepts',
        topics: [
          { id: 'chem-11-1-1', title: 'Importance of Chemistry', description: 'Scope of chemistry' },
          { id: 'chem-11-1-2', title: 'Matter and its Nature', description: 'States of matter' },
          { id: 'chem-11-1-3', title: 'Laws of Chemical Combination', description: 'Stoichiometry' },
        ],
      },
      {
        id: 'chem-11-2',
        number: 2,
        title: 'Structure of Atom',
        topics: [
          { id: 'chem-11-2-1', title: 'Atomic Models', description: 'Bohr and Rutherford' },
          { id: 'chem-11-2-2', title: 'Quantum Numbers', description: 'Orbitals' },
          { id: 'chem-11-2-3', title: 'Electronic Configuration', description: 'Aufbau principle' },
        ],
      },
      {
        id: 'chem-11-3',
        number: 3,
        title: 'Classification of Elements',
        topics: [
          { id: 'chem-11-3-1', title: 'Periodic Table Development', description: 'Mendeleev and Moseley' },
          { id: 'chem-11-3-2', title: 'Modern Periodic Table', description: '18 groups' },
          { id: 'chem-11-3-3', title: 'Periodic Trends', description: 'Atomic radius, IE' },
        ],
      },
      {
        id: 'chem-11-4',
        number: 4,
        title: 'Chemical Bonding',
        topics: [
          { id: 'chem-11-4-1', title: 'Ionic Bonding', description: 'Electrovalent bond' },
          { id: 'chem-11-4-2', title: 'Covalent Bonding', description: 'Shared electrons' },
          { id: 'chem-11-4-3', title: 'VSEPR Theory', description: 'Molecular geometry' },
        ],
      },
      {
        id: 'chem-11-5',
        number: 5,
        title: 'Thermodynamics',
        topics: [
          { id: 'chem-11-5-1', title: 'System and Surroundings', description: 'Open, closed, isolated' },
          { id: 'chem-11-5-2', title: 'First Law', description: 'Conservation of energy' },
          { id: 'chem-11-5-3', title: 'Enthalpy', description: 'Heat changes' },
        ],
      },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    chapters: [
      {
        id: 'bio-11-1',
        number: 1,
        title: 'The Living World',
        topics: [
          { id: 'bio-11-1-1', title: 'Diversity in Living World', description: 'Taxonomy' },
          { id: 'bio-11-1-2', title: 'Biological Classification', description: 'Five kingdom system' },
        ],
      },
      {
        id: 'bio-11-2',
        number: 2,
        title: 'Structural Organization',
        topics: [
          { id: 'bio-11-2-1', title: 'Plant Tissues', description: 'Meristematic, permanent' },
          { id: 'bio-11-2-2', title: 'Animal Tissues', description: 'Epithelial, muscle' },
        ],
      },
      {
        id: 'bio-11-3',
        number: 3,
        title: 'Biomolecules',
        topics: [
          { id: 'bio-11-3-1', title: 'Carbohydrates', description: 'Sugars and starch' },
          { id: 'bio-11-3-2', title: 'Proteins', description: 'Amino acids' },
          { id: 'bio-11-3-3', title: 'Nucleic Acids', description: 'DNA and RNA' },
        ],
      },
      {
        id: 'bio-11-4',
        number: 4,
        title: 'Cell: The Unit of Life',
        topics: [
          { id: 'bio-11-4-1', title: 'Cell Structure', description: 'Prokaryotic vs Eukaryotic' },
          { id: 'bio-11-4-2', title: 'Cell Organelles', description: 'Mitochondria, chloroplast' },
        ],
      },
      {
        id: 'bio-11-5',
        number: 5,
        title: 'Photosynthesis',
        topics: [
          { id: 'bio-11-5-1', title: 'Photosynthetic Pigments', description: 'Chlorophyll' },
          { id: 'bio-11-5-2', title: 'Light Reaction', description: 'ATP and NADPH' },
          { id: 'bio-11-5-3', title: 'Dark Reaction', description: 'Calvin cycle' },
        ],
      },
    ],
  },
  {
    id: 'maths-science',
    name: 'Mathematics',
    icon: '📊',
    chapters: [
      {
        id: 'math-hs-1',
        number: 1,
        title: 'Sets',
        topics: [
          { id: 'math-hs-1-1', title: 'Types of Sets', description: 'Empty, finite, infinite' },
          { id: 'math-hs-1-2', title: 'Subsets', description: 'Proper and equal' },
          { id: 'math-hs-1-3', title: 'Operations on Sets', description: 'Union, intersection' },
        ],
      },
      {
        id: 'math-hs-2',
        number: 2,
        title: 'Relations and Functions',
        topics: [
          { id: 'math-hs-2-1', title: 'Cartesian Product', description: 'Ordered pairs' },
          { id: 'math-hs-2-2', title: 'Types of Relations', description: 'Reflexive, symmetric' },
          { id: 'math-hs-2-3', title: 'Functions', description: 'One-one, onto' },
        ],
      },
      {
        id: 'math-hs-3',
        number: 3,
        title: 'Trigonometric Functions',
        topics: [
          { id: 'math-hs-3-1', title: 'Angles and Measures', description: 'Degree, radian' },
          { id: 'math-hs-3-2', title: 'Trigonometric Identities', description: 'Pythagorean identities' },
          { id: 'math-hs-3-3', title: 'Sum and Difference Formulas', description: 'Compound angles' },
        ],
      },
      {
        id: 'math-hs-4',
        number: 4,
        title: 'Complex Numbers',
        topics: [
          { id: 'math-hs-4-1', title: 'Imaginary Numbers', description: 'i = √-1' },
          { id: 'math-hs-4-2', title: 'Algebra of Complex Numbers', description: 'Operations' },
          { id: 'math-hs-4-3', title: 'Polar Form', description: 'Modulus and argument' },
        ],
      },
      {
        id: 'math-hs-5',
        number: 5,
        title: 'Linear Inequalities',
        topics: [
          { id: 'math-hs-5-1', title: 'Solving Inequalities', description: 'Linear equations' },
          { id: 'math-hs-5-2', title: 'Graphical Solution', description: 'Number line method' },
        ],
      },
    ],
  },
  {
    id: 'english-science',
    name: 'English',
    icon: '📚',
    chapters: [
      {
        id: 'eng-hs-1',
        number: 1,
        title: 'The Portrait of a Lady',
        topics: [
          { id: 'eng-hs-1-1', title: 'Summary', description: 'Chapter summary' },
          { id: 'eng-hs-1-2', title: 'Character Analysis', description: 'Grandmother figure' },
        ],
      },
      {
        id: 'eng-hs-2',
        number: 2,
        title: 'We\'re Not Afraid to Die',
        topics: [
          { id: 'eng-hs-2-1', title: 'Summary', description: 'Adventure story' },
          { id: 'eng-hs-2-2', title: 'Themes', description: 'Survival and courage' },
        ],
      },
      {
        id: 'eng-hs-3',
        number: 3,
        title: 'Discovering Tut',
        topics: [
          { id: 'eng-hs-3-1', title: 'Summary', description: 'Tutankhamun' },
          { id: 'eng-hs-3-2', title: 'Archaeology', description: 'Egyptian history' },
        ],
      },
    ],
  },
  {
    id: 'hindi-science',
    name: 'Hindi',
    icon: 'हिंदी',
    chapters: [
      {
        id: 'hin-hs-1',
        number: 1,
        title: 'आत्मकथ्य (Self-Portrait)',
        topics: [
          { id: 'hin-hs-1-1', title: 'कविता का सार', description: 'Poem summary' },
          { id: 'hin-hs-1-2', title: 'काव्य सौंदर्य', description: 'Poetic beauty' },
        ],
      },
      {
        id: 'hin-hs-2',
        number: 2,
        title: 'राजस्थान की रजवाड़ी (Royal Rajputana)',
        topics: [
          { id: 'hin-hs-2-1', title: 'पाठ विश्लेषण', description: 'Text analysis' },
          { id: 'hin-hs-2-2', title: 'ऐतिहासिक पृष्ठभूमि', description: 'Historical background' },
        ],
      },
    ],
  },
];

// Commerce Stream Subjects (Classes 11-12)
const commerceStreamSubjects: Subject[] = [
  {
    id: 'accounts',
    name: 'Accountancy',
    icon: '📊',
    chapters: [
      {
        id: 'acc-11-1',
        number: 1,
        title: 'Introduction to Accounting',
        topics: [
          { id: 'acc-11-1-1', title: 'Meaning and Objectives', description: 'Recording transactions' },
          { id: 'acc-11-1-2', title: 'Types of Accounts', description: 'Personal, real, nominal' },
          { id: 'acc-11-1-3', title: 'Accounting Equation', description: 'Assets = Liabilities + Capital' },
        ],
      },
      {
        id: 'acc-11-2',
        number: 2,
        title: 'Basic Accounting Terms',
        topics: [
          { id: 'acc-11-2-1', title: 'Business Transactions', description: 'Financial activities' },
          { id: 'acc-11-2-2', title: 'Capital and Revenue', description: 'Classification' },
        ],
      },
      {
        id: 'acc-11-3',
        number: 3,
        title: 'Accounting Standards',
        topics: [
          { id: 'acc-11-3-1', title: 'Need for Standards', description: 'Consistency' },
          { id: 'acc-11-3-2', title: 'Indian Accounting Standards', description: 'AS overview' },
        ],
      },
      {
        id: 'acc-11-4',
        number: 4,
        title: 'Journal',
        topics: [
          { id: 'acc-11-4-1', title: 'Format of Journal', description: 'Recording entries' },
          { id: 'acc-11-4-2', title: 'Rules of Journalizing', description: 'Debit and credit' },
        ],
      },
      {
        id: 'acc-11-5',
        number: 5,
        title: 'Ledger',
        topics: [
          { id: 'acc-11-5-1', title: 'Format of Ledger', description: 'Posting entries' },
          { id: 'acc-11-5-2', title: 'Balancing of Accounts', description: 'Trial balance prep' },
        ],
      },
    ],
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: '📈',
    chapters: [
      {
        id: 'eco-11-1',
        number: 1,
        title: 'Introduction to Economics',
        topics: [
          { id: 'eco-11-1-1', title: 'Meaning of Economics', description: 'Scarcity and choice' },
          { id: 'eco-11-1-2', title: 'Positive and Normative Economics', description: 'Facts vs values' },
        ],
      },
      {
        id: 'eco-11-2',
        number: 2,
        title: 'Collection of Data',
        topics: [
          { id: 'eco-11-2-1', title: 'Sources of Data', description: 'Primary and secondary' },
          { id: 'eco-11-2-2', title: 'Census and Sampling', description: 'Methods of collection' },
        ],
      },
      {
        id: 'eco-11-3',
        number: 3,
        title: 'Organization of Data',
        topics: [
          { id: 'eco-11-3-1', title: 'Classification', description: 'Frequency distribution' },
          { id: 'eco-11-3-2', title: 'Tabulation', description: 'Tables and graphs' },
        ],
      },
      {
        id: 'eco-11-4',
        number: 4,
        title: 'Presentation of Data',
        topics: [
          { id: 'eco-11-4-1', title: 'Bar Diagrams', description: 'Visual representation' },
          { id: 'eco-11-4-2', title: 'Histograms', description: 'Frequency polygons' },
        ],
      },
      {
        id: 'eco-11-5',
        number: 5,
        title: 'Measures of Central Tendency',
        topics: [
          { id: 'eco-11-5-1', title: 'Mean, Median, Mode', description: 'Averages' },
          { id: 'eco-11-5-2', title: 'Calculation Methods', description: 'Formulas' },
        ],
      },
    ],
  },
  {
    id: 'business-studies',
    name: 'Business Studies',
    icon: '💼',
    chapters: [
      {
        id: 'bs-11-1',
        number: 1,
        title: 'Nature and Significance of Management',
        topics: [
          { id: 'bs-11-1-1', title: 'Meaning of Management', description: 'Efficient utilization' },
          { id: 'bs-11-1-2', title: 'Characteristics of Management', description: 'Goal-oriented' },
          { id: 'bs-11-1-3', title: 'Management as Science or Art', description: 'Nature debate' },
        ],
      },
      {
        id: 'bs-11-2',
        number: 2,
        title: 'Principles of Management',
        topics: [
          { id: 'bs-11-2-1', title: 'Fayol\'s 14 Principles', description: 'Scientific management' },
          { id: 'bs-11-2-2', title: 'Taylor\'s Scientific Management', description: 'Efficiency' },
        ],
      },
      {
        id: 'bs-11-3',
        number: 3,
        title: 'Business Environment',
        topics: [
          { id: 'bs-11-3-1', title: 'Meaning of Environment', description: 'Internal and external' },
          { id: 'bs-11-3-2', title: 'Importance of Environment', description: 'Impact on business' },
        ],
      },
      {
        id: 'bs-11-4',
        number: 4,
        title: 'Planning',
        topics: [
          { id: 'bs-11-4-1', title: 'Meaning of Planning', description: 'Setting objectives' },
          { id: 'bs-11-4-2', title: 'Features of Planning', description: 'Forward-looking' },
        ],
      },
      {
        id: 'bs-11-5',
        number: 5,
        title: 'Organizing',
        topics: [
          { id: 'bs-11-5-1', title: 'Meaning of Organizing', description: 'Structure creation' },
          { id: 'bs-11-5-2', title: 'Formal and Informal Organization', description: 'Structure types' },
        ],
      },
    ],
  },
  {
    id: 'english-commerce',
    name: 'English',
    icon: '📚',
    chapters: [
      {
        id: 'eng-com-1',
        number: 1,
        title: 'The Portrait of a Lady',
        topics: [
          { id: 'eng-com-1-1', title: 'Summary', description: 'Chapter summary' },
          { id: 'eng-com-1-2', title: 'Character Analysis', description: 'Grandmother figure' },
        ],
      },
      {
        id: 'eng-com-2',
        number: 2,
        title: 'We\'re Not Afraid to Die',
        topics: [
          { id: 'eng-com-2-1', title: 'Summary', description: 'Adventure story' },
          { id: 'eng-com-2-2', title: 'Themes', description: 'Survival and courage' },
        ],
      },
    ],
  },
  {
    id: 'hindi-commerce',
    name: 'Hindi',
    icon: 'हिंदी',
    chapters: [
      {
        id: 'hin-com-1',
        number: 1,
        title: 'आत्मकथ्य (Self-Portrait)',
        topics: [
          { id: 'hin-com-1-1', title: 'कविता का सार', description: 'Poem summary' },
          { id: 'hin-com-1-2', title: 'काव्य सौंदर्य', description: 'Poetic beauty' },
        ],
      },
    ],
  },
];

// Arts Stream Subjects (Classes 11-12)
const artsStreamSubjects: Subject[] = [
  {
    id: 'history',
    name: 'History',
    icon: '📜',
    chapters: [
      {
        id: 'his-11-1',
        number: 1,
        title: 'From the Beginning of Time',
        topics: [
          { id: 'his-11-1-1', title: 'Origin of Humans', description: 'Prehistoric era' },
          { id: 'his-11-1-2', title: 'Paleolithic Age', description: 'Old stone age' },
          { id: 'his-11-1-3', title: 'Neolithic Age', description: 'New stone age' },
        ],
      },
      {
        id: 'his-11-2',
        number: 2,
        title: 'Writing City and Civilization',
        topics: [
          { id: 'his-11-2-1', title: 'Sumer and Mesopotamia', description: 'Cradle of civilization' },
          { id: 'his-11-2-2', title: 'Indus Valley Civilization', description: 'Harappan culture' },
        ],
      },
      {
        id: 'his-11-3',
        number: 3,
        title: 'An Empire Across Three Continents',
        topics: [
          { id: 'his-11-3-1', title: 'Roman Empire', description: 'Pax Romana' },
          { id: 'his-11-3-2', title: 'Spread of Christianity', description: 'Religious transformation' },
        ],
      },
      {
        id: 'his-11-4',
        number: 4,
        title: 'The Central Islamic Lands',
        topics: [
          { id: 'his-11-4-1', title: 'Rise of Islam', description: 'Prophet Muhammad' },
          { id: 'his-11-4-2', title: 'Caliphates', description: 'Umayyad and Abbasid' },
        ],
      },
      {
        id: 'his-11-5',
        number: 5,
        title: 'Changing Traditions',
        topics: [
          { id: 'his-11-5-1', title: 'Medieval Europe', description: 'Feudalism' },
          { id: 'his-11-5-2', title: 'Renaissance', description: 'Cultural revival' },
        ],
      },
    ],
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🗺️',
    chapters: [
      {
        id: 'geo-11-1',
        number: 1,
        title: 'Geography as a Discipline',
        topics: [
          { id: 'geo-11-1-1', title: 'Nature of Geography', description: 'Spatial distribution' },
          { id: 'geo-11-1-2', title: 'Branches of Geography', description: 'Physical and human' },
        ],
      },
      {
        id: 'geo-11-2',
        number: 2,
        title: 'The Earth',
        topics: [
          { id: 'geo-11-2-1', title: 'Interior of Earth', description: 'Crust, mantle, core' },
          { id: 'geo-11-2-2', title: 'Rocks and Minerals', description: 'Rock cycle' },
        ],
      },
      {
        id: 'geo-11-3',
        number: 3,
        title: 'Landforms',
        topics: [
          { id: 'geo-11-3-1', title: 'Mountains and Plateaus', description: ' Erosional features' },
          { id: 'geo-11-3-2', title: 'Rivers and Glaciers', description: 'Depositional features' },
        ],
      },
      {
        id: 'geo-11-4',
        number: 4,
        title: 'Climate',
        topics: [
          { id: 'geo-11-4-1', title: 'Weather and Climate', description: 'Atmospheric conditions' },
          { id: 'geo-11-4-2', title: 'Indian Monsoon', description: 'Seasonal winds' },
        ],
      },
      {
        id: 'geo-11-5',
        number: 5,
        title: 'Natural Vegetation',
        topics: [
          { id: 'geo-11-5-1', title: 'Types of Forests', description: 'Tropical, temperate' },
          { id: 'geo-11-5-2', title: 'Biodiversity', description: 'Conservation' },
        ],
      },
    ],
  },
  {
    id: 'political-science',
    name: 'Political Science',
    icon: '🏛️',
    chapters: [
      {
        id: 'pol-11-1',
        number: 1,
        title: 'Political Theory: An Introduction',
        topics: [
          { id: 'pol-11-1-1', title: 'What is Political Theory?', description: 'Concepts and ideas' },
          { id: 'pol-11-1-2', title: 'Importance of Politics', description: 'Power and governance' },
        ],
      },
      {
        id: 'pol-11-2',
        number: 2,
        title: 'Liberalism',
        topics: [
          { id: 'pol-11-2-1', title: 'Liberal Thought', description: 'Individual freedom' },
          { id: 'pol-11-2-2', title: 'Criticisms of Liberalism', description: 'Challenges' },
        ],
      },
      {
        id: 'pol-11-3',
        number: 3,
        title: 'Socialism',
        topics: [
          { id: 'pol-11-3-1', title: 'Origins of Socialism', description: 'Utopian socialism' },
          { id: 'pol-11-3-2', title: 'Marx and Marxism', description: 'Scientific socialism' },
        ],
      },
      {
        id: 'pol-11-4',
        number: 4,
        title: 'Democracy',
        topics: [
          { id: 'pol-11-4-1', title: 'Meaning of Democracy', description: 'Rule by people' },
          { id: 'pol-11-4-2', title: 'Types of Democracy', description: 'Direct and indirect' },
        ],
      },
      {
        id: 'pol-11-5',
        number: 5,
        title: 'Rights',
        topics: [
          { id: 'pol-11-5-1', title: 'Human Rights', description: 'Fundamental rights' },
          { id: 'pol-11-5-2', title: 'Citizenship Rights', description: 'Constitutional rights' },
        ],
      },
    ],
  },
  {
    id: 'economics-arts',
    name: 'Economics',
    icon: '📈',
    chapters: [
      {
        id: 'eco-arts-11-1',
        number: 1,
        title: 'Introduction to Economics',
        topics: [
          { id: 'eco-arts-11-1-1', title: 'Meaning of Economics', description: 'Scarcity and choice' },
          { id: 'eco-arts-11-1-2', title: 'Economic Problem', description: 'Allocation of resources' },
        ],
      },
      {
        id: 'eco-arts-11-2',
        number: 2,
        title: 'Consumers and Producers',
        topics: [
          { id: 'eco-arts-11-2-1', title: 'Consumer Behavior', description: 'Demand and supply' },
          { id: 'eco-arts-11-2-2', title: 'Market Mechanism', description: 'Price determination' },
        ],
      },
      {
        id: 'eco-arts-11-3',
        number: 3,
        title: 'Market and Prices',
        topics: [
          { id: 'eco-arts-11-3-1', title: 'Demand', description: 'Law of demand' },
          { id: 'eco-arts-11-3-2', title: 'Supply', description: 'Law of supply' },
        ],
      },
      {
        id: 'eco-arts-11-4',
        number: 4,
        title: 'The Government and Economy',
        topics: [
          { id: 'eco-arts-11-4-1', title: 'Role of Government', description: 'Fiscal policy' },
          { id: 'eco-arts-11-4-2', title: 'Taxation', description: 'Types of taxes' },
        ],
      },
      {
        id: 'eco-arts-11-5',
        number: 5,
        title: 'Development Experience',
        topics: [
          { id: 'eco-arts-11-5-1', title: 'Economic Development', description: 'Indicators' },
          { id: 'eco-arts-11-5-2', title: 'Indian Economy', description: 'Post-independence growth' },
        ],
      },
    ],
  },
  {
    id: 'english-arts',
    name: 'English',
    icon: '📚',
    chapters: [
      {
        id: 'eng-arts-1',
        number: 1,
        title: 'The Portrait of a Lady',
        topics: [
          { id: 'eng-arts-1-1', title: 'Summary', description: 'Chapter summary' },
          { id: 'eng-arts-1-2', title: 'Character Analysis', description: 'Grandmother figure' },
        ],
      },
      {
        id: 'eng-arts-2',
        number: 2,
        title: 'We\'re Not Afraid to Die',
        topics: [
          { id: 'eng-arts-2-1', title: 'Summary', description: 'Adventure story' },
          { id: 'eng-arts-2-2', title: 'Themes', description: 'Survival and courage' },
        ],
      },
    ],
  },
  {
    id: 'hindi-arts',
    name: 'Hindi',
    icon: 'हिंदी',
    chapters: [
      {
        id: 'hin-arts-1',
        number: 1,
        title: 'आत्मकथ्य (Self-Portrait)',
        topics: [
          { id: 'hin-arts-1-1', title: 'कविता का सार', description: 'Poem summary' },
          { id: 'hin-arts-1-2', title: 'काव्य सौंदर्य', description: 'Poetic beauty' },
        ],
      },
    ],
  },
];

// 12+ Pathways (Competitive Exams & Skills)
const pathwaysData: Pathway[] = [
  {
    id: 'competitive-exams',
    name: 'Competitive Exams',
    icon: '🎯',
    description: 'Preparation for JEE, NEET, UPSC and more',
    categories: [
      {
        id: 'jee',
        name: 'JEE (Engineering)',
        courses: [
          { id: 'jee-maths', title: 'Advanced Mathematics', description: 'Calculus, algebra, coordinate geometry' },
          { id: 'jee-physics', title: 'Physics Mastery', description: 'Mechanics, electromagnetism, optics' },
          { id: 'jee-chemistry', title: 'Chemistry Complete', description: 'Organic, inorganic, physical' },
        ],
      },
      {
        id: 'neet',
        name: 'NEET (Medical)',
        courses: [
          { id: 'neet-bio', title: 'Biology Complete', description: 'Botany and zoology' },
          { id: 'neet-physics', title: 'Physics for NEET', description: 'NCERT based physics' },
          { id: 'neet-chem', title: 'Chemistry for NEET', description: 'Organic and inorganic' },
        ],
      },
      {
        id: 'upsc',
        name: 'UPSC / Civil Services',
        courses: [
          { id: 'upsc-gs', title: 'General Studies', description: 'History, geography, polity' },
          { id: 'upsc-current', title: 'Current Affairs', description: 'News and events' },
          { id: 'upsc-optional', title: 'Optional Subject', description: 'Subject-specific preparation' },
        ],
      },
    ],
  },
  {
    id: 'skill-building',
    name: 'Skill Building',
    icon: '🚀',
    description: 'Learn practical skills for the future',
    categories: [
      {
        id: 'coding',
        name: 'Coding & Programming',
        courses: [
          { id: 'code-python', title: 'Python Programming', description: 'From basics to advanced' },
          { id: 'code-web', title: 'Web Development', description: 'HTML, CSS, JavaScript' },
          { id: 'code-mobile', title: 'App Development', description: 'React Native, Flutter' },
        ],
      },
      {
        id: 'design',
        name: 'Design & Creative',
        courses: [
          { id: 'design-ui', title: 'UI/UX Design', description: 'User interface principles' },
          { id: 'design-graphic', title: 'Graphic Design', description: 'Photoshop, Illustrator' },
        ],
      },
      {
        id: 'media',
        name: 'Content & Media',
        courses: [
          { id: 'media-video', title: 'Video Editing', description: 'Premiere Pro, DaVinci' },
          { id: 'media-content', title: 'Content Creation', description: 'Writing, storytelling' },
        ],
      },
    ],
  },
];

// Helper function to get curriculum based on class
export function getCurriculumForClass(classValue: string, stream?: string | null): Curriculum {
  const classNum = parseInt(classValue, 10);

  // Classes 1-5: Primary School
  if (classNum >= 1 && classNum <= 5) {
    return { subjects: primarySchoolSubjects };
  }

  // Classes 6-10: Middle and High School
  if (classNum >= 6 && classNum <= 10) {
    return { subjects: middleSchoolSubjects };
  }

  // Classes 11-12: Stream-based
  if (classNum === 11 || classNum === 12) {
    if (stream === 'Science') {
      return { subjects: scienceStreamSubjects };
    }
    if (stream === 'Commerce') {
      return { subjects: commerceStreamSubjects };
    }
    if (stream === 'Arts') {
      return { subjects: artsStreamSubjects };
    }
    // Default to science if no stream selected
    return { subjects: scienceStreamSubjects };
  }

  // 12+: Pathways
  if (classValue === '12+') {
    return { subjects: [], pathways: pathwaysData };
  }

  // Fallback
  return { subjects: middleSchoolSubjects };
}

// Helper function to get class range label
export function getClassLabel(classValue: string): string {
  const classNum = parseInt(classValue, 10);
  if (classValue === '12+') return '12+';

  if (classNum >= 1 && classNum <= 5) return `Class ${classNum} (Primary)`;
  if (classNum >= 6 && classNum <= 10) return `Class ${classNum} (Secondary)`;
  if (classNum >= 11 && classNum <= 12) return `Class ${classNum} (Higher Secondary)`;

  return `Class ${classValue}`;
}

// Helper function to check if class has streams (11-12)
export function classHasStream(classValue: string): boolean {
  return classValue === '11' || classValue === '12';
}

// Helper function to check if class is 12+
export function isClass12Plus(classValue: string): boolean {
  return classValue === '12+';
}

export default {
  primarySchoolSubjects,
  middleSchoolSubjects,
  scienceStreamSubjects,
  commerceStreamSubjects,
  artsStreamSubjects,
  pathwaysData,
  getCurriculumForClass,
  getClassLabel,
  classHasStream,
  isClass12Plus,
};
