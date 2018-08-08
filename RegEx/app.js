// let re;
// re = /hello/i;  // i = case insensitive

// console.log(re)
//
// console.log(re.source)

//exec() - return result in an array or null
// const result = re.exec('hello world')
// console.log(result.index)
// console.log(result[0])



// test() - returns true or false
// const result = re.test('Hello') //returns false because of uppercase H (unless there is an i after expression )
 // re= /hello/i ---> i is a flag, makes test() insensitive of uppercase or lowercase


// match() - returns array or null
// const str = 'Hello There';
// const result = str.match(re)


//search() - returns index of the first match, if not found returns -1
// const str = 'Hello There';
// const result = str.search(re)


// replace() - returns new string with some or all matches of a pattern
// const str = 'Hello there';
// const newString = str.replace(re, 'Hi')
//
// console.log(newString)


//      -------         PART TWO        -----------


let re;

//literal characters
// re= /hello/;
re = /hello/i

// Metacharacters Symbols+Destructuring
re = /^h/i  // ^h  must to start with
re = /world$/i  // $  must end with
re = /^hello$/i // must begin AND end with
re = /h.llo/i // the . matches any ONE character (almost wild card) (exempel hallo)
re = /h*llo/i // the * matches any character 0 or more (wild card) (exempel heeeello)
re = /gre?a?y/i // ? --> optional character
re = /gre?a?y\?/i // ? --> Escape character


// Brackets [] - Character Sets
re = /gr[ae]y/i   // [ae] -> must be an a or e (better solution than the optional ? )
re = /[GF]ray/      // must be G or F
re = /[^GF]ray/      // will match anything but G or F (inside brackets means NOT)
re = /[A-Z]ray/i    //match any letter
re = /[A-Za-z]ray/  //match any letter
re = /[0-9]ray/     //matches any digits
re = /[0-9][0-9]ray/     //matches any digits (matches for example 10ray)


// Braces {} - Quantifiers
re = /Hel{2}o/i     //  there has to be 2 l
re = /Hel{2,4}o/i   // between 2 and 4 l's
re = /Hel{2,}o/i    // must occur at least 2 times


// Parenthesis - Grouping
re = /([0-9]x){3}/


//     ----------         part three

//Shorthand character classes
re = /\w/       // word character - alphanumeric character (any letter or number or _ )
re = /\w+/       // + equals 1 or more
re = /\W/       // non-word character
re = /\d+/       // match any digit ( 1 or more)
re = /\d/       // match any digit
re = /\D/       // match any non-digit
re = /\s/       // match whitespace character
re = /\S/       // match NON-whitespace character
re = /Hell\b/i  // word boundary


// Assertions
re = /x(?=y)/   // match x only if followed by y
re = /x(?!y)/   // match x only if NOT followed by y


// string to match
const str = 'world hej';

// log results
const result = re.exec(str);
console.log(result)

function reTest(re, str) {
    if(re.test(str)) {
        console.log(`${str} matches ${re.source}`)
    } else {
        console.log(`${str} does NOT match ${re.source}`)
    }
}

reTest(re, str)