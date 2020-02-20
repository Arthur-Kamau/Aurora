# JSON GENRATOR

what a json generator does is scan through a file splitting the code line by line
each line should contain utmost two values those are `key value` eg `int age` or `string name`

each key and value   will be inserted to hasmap of key and value.
key can only be of specific types ie ` INT , INTEGER, STRING , STR, BOOL ,  OBJECT`
they key are converted to lowercase to prevent case sensitivity.

a new map is generated behind the scene with the value of the previous map as the key to the current map,the value of the current map is generated,through comparison of the previous map key and randomizer genreating apropriate type data then inserted into the value of the current map.


in future a value could be placed  as third parameter or after `;` indicating the maximum string length or the integer range,or if a string is an email.