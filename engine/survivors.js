/**
	This file holds random survivor data, such as names and sentences
**/

var Survivors = [];

var ChitChat = [
	"Eat your foot.",
	"I hate the green flashing light.",
	"Hello. I have the urge to kill.",
	"Oh no! You're going to speak again, aren't you?",
	"DO NOT DISTURB, evil genius at work.",
	"I'm with stupid",
	"Rubber ducks are planning world domination!",
	"But my tree only hit the car in self-defence!",
	"I know kung fu and 50 other dangerous words.",
	"Did my sarcasm hurt your feels? Get over it.",
	"Love your enemies, it makes them angry.",
	"Fat kids are harder to kidnap.",
	"Shut up voices! Or I will poke you with y pen again!",
	"Save water, drink beer.",
	"Save a tree, eat a beaver.",
	"Get high, climb a tree.",
	"Save a horse, ride a cowboy.",
	"Don't mess with me! I have a stick!",
	"Go away, evil Mr Scissors!",
	"Think of gingerbread men: are they delicious holiday treats or just another way for children to show off their cannibalism?",
	"Ha ha! I don't get it.",
	"We're all gonna die, but I have a helmet.",
	"It's much funnier now that I get it.",
	"No trespassing! Violators will be shot and survivors will be shot again.",
	"Come to the dark side. We have cookies.",
	"My eraser will kick your eraser's ass!",
	"Save a drum, bang a drummer.",
	"Defy gravity; all the cool kids are doing it.",
	"The decision is maybe and that's final!",
	"I'm not weird, I'm gifted.",
	"Life called... you failed.",
	"My mom said that I am cool because I don't do drugs.",
	"I am pretending to be a tomato.",
	"They say that hard work never hurt anyone but why take the risk?",
	"Never put a cat on your head.",
	"Don't eat my foot!",
	"Never set yourself on fire.",
	"The banana has legs!",
	"Its better to look stupid and keep your mouth closed than to open it and prove it.",
	"Don't worry, I was born this way.",
	"I am being attacked by a giant screaming rainbow! Oh, sorry, it was just technical difficulties.",
	"Banana suicide!!",
	"I'm not random! I just have lots of thoughts.",
	"I have a magical box and it is better than yours.",
	"Back off! The ice cream is mine!",
	"You're ugly, go away!",
	"This is Bob. Bob likes you. Bob likes sharp things. I suggest you run from Bob.",
	"Tomorrow has been cancelled due to lack of interest.",
	"Caution! There is water on the road during rain.",
	"No, dammit! I can't show you the way to Sesame Street!",
	"Even my issues have issues.",
	"Angry people need hugs or sharp objects",
	"I here voices and they don't like you!",
	"My imaginary friend thinks you have issues.",
	"I like eggs.",
	"Would you like some popcorn?",
	"Two muffins are chilling in an oven. The one muffin screams, 'Oh my gosh, we are in an oven!' The second muffin replied, 'Holy cow, I talking muffin!'",
	"That is a typical symptom of lover-neurosis.",
	"I am here to install your cushion.",
	"That is so typical of a SUDOKU fan!",
	"Your hands are really hairy.",
	"I do whatever my Rice Crispies tell me to do",
	"You sound like yourself",
	"Brusselsprouts are green!",
	"Butternuts are cool",
	"I can think!",
	"Bnanas can be green!",
	"Bludhing Monkey!",
	"Tomatoes are depressing",
	"You aren't as stupid as you make it look",
	"Sheep are just demented sticks of candy floss",
	"My eyebrow died",
	"We are so skilled!",
	"I can't remember if it's time for your medication or mine",
	"I am thinking bananas"
];

var SurvivorPool = [
	{ name: "Michael Washington" },
	{ name: "James Griffin" },
	{ name: "Maria Mitchell" },
	{ name: "James Bailey" },
	{ name: "Sandra Taylor" },
	{ name: "William Rodriguez" },
	{ name: "Jessica Bailey" },
	{ name: "James Phillips" },
	{ name: "Robert Clark" },
	{ name: "Linda Ward" },
	{ name: "Richard Lopez" },
	{ name: "Stephen Green" },
	{ name: "Julia Thomas" },
	{ name: "Brenda Hernandez" },
	{ name: "Walter Richardson" },
	{ name: "Lawrence Lee" },
	{ name: "Catherine Sanchez" },
	{ name: "Sean Anderson" },
	{ name: "Matthew Bell" },
	{ name: "Donald Clark" },
	{ name: "Jesse Wood" },
	{ name: "Ruth Reed" },
	{ name: "Scott Diaz" },
	{ name: "Jennifer King" },
	{ name: "Sandra Ramirez" },
	{ name: "Jonathan Howard" },
	{ name: "Michelle Perry" },
	{ name: "Martin Rodriguez" },
	{ name: "Benjamin Henderson" },
	{ name: "Kelly Gonzales" },
	{ name: "Mary Martin" },
	{ name: "Annie Peterson" },
	{ name: "Douglas Scott" },
	{ name: "Anna Brown" },
	{ name: "Paul Harris" },
	{ name: "Randy Sanders" },
	{ name: "Bobby Bailey" },
	{ name: "Linda Miller" },
	{ name: "Joshua Rivera" },
	{ name: "Charles Perez" },
	{ name: "Andrew Brooks" },
	{ name: "Anne Gonzalez" },
	{ name: "Tammy Ward" },
	{ name: "Pamela Murphy" },
	{ name: "John Watson" },
	{ name: "Jeffrey Thompson" },
	{ name: "Craig Nelson" },
	{ name: "Terry Rogers" },
	{ name: "Keith Moore" },
	{ name: "Nancy Morgan" },
	{ name: "Nicholas Baker" },
	{ name: "Nicole Hall" },
	{ name: "Melissa Robinson" },
	{ name: "Daniel Kelly" },
	{ name: "Rebecca Wilson" },
	{ name: "Andrea Taylor" },
	{ name: "Johnny Cox" },
	{ name: "Thomas Foster" },
	{ name: "Robert Mitchell" },
	{ name: "Karen Hughes" },
	{ name: "Jessica Wright" },
	{ name: "Debra Adams" },
	{ name: "Clarence Lewis" },
	{ name: "Gregory Morris" },
	{ name: "Harold Phillips" },
	{ name: "Victor Bryant" },
	{ name: "Wanda Bennett" },
	{ name: "Deborah Russell" },
	{ name: "Patrick Cook" },
	{ name: "Philip Griffin" },
	{ name: "Phillip Parker" },
	{ name: "Jane Cooper" },
	{ name: "Kathleen Davis" },
	{ name: "Adam Stewart" },
	{ name: "Stephanie Jenkins" },
	{ name: "Christina White" },
	{ name: "Ashley Coleman" },
	{ name: "Gerald Campbell" },
	{ name: "Eugene Martinez" },
	{ name: "Rachel Turner" },
	{ name: "Kathy Butler" },
	{ name: "Maria Hill" },
	{ name: "Carolyn Young" },
	{ name: "Edward Carter" },
	{ name: "Laura Simmons" },
	{ name: "Cheryl Walker" },
	{ name: "Cynthia Ross" },
	{ name: "Donna Edwards" },
	{ name: "Janice James" },
	{ name: "Amanda Allen" },
	{ name: "Chris Barnes" },
	{ name: "Amy Jones" },
	{ name: "Peter Patterson" },
	{ name: "Shirley Price" },
	{ name: "Joyce Washington" },
	{ name: "Alice Flores" },
	{ name: "Steven Powell" },
	{ name: "Heather Evans" },
	{ name: "Larry Roberts" },
	{ name: "Wayne Long" },
	{ name: "Billy Garcia" },
	{ name: "Diana Jackson" },
	{ name: "Marie Williams" },
	{ name: "Kathryn Gray" },
	{ name: "Ernest Collins" },
	{ name: "Doris Smith" },
	{ name: "Jimmy Johnson" },
	{ name: "Frank Torres" },
	{ name: "Louis Alexander" }
];
