# Code Challenge
## Installation
### Docker

```sh
cd flowerChallenge
 docker build -t fchimage .
```
This will create the  image and pull in the necessary dependencies.

Once done, run the Docker image 

```sh
 cat ./sample/input.txt | docker run -i --name containerch01 fchimage 
```

The bouquets print on output if you want to save in file 
```sh
 cat ./sample/input.txt | docker run -i --name containerch01 fchimage > output.txt
```

To run agian
```sh
 cat ./sample/input.txt | docker start -i containrch01
```
## Doc
### Modeuls

* _index.js_  
* _ReadFile.js_
* _Algo.js_
* _Requirement.js_ 
* _Bouquet.js_ 

## How it's done

Application receives input from stdin line by line and pass the stream input to _Algo_ for processing. _Algo_ detect the bouquets input and start create the object for each _bouquets_ and store in Algo bouquets. This process stop when received empty line from input. After that flowers receiving from input and _Algo_ start to push them to proper bouquets.      

The chanllenge is which bouquets will fullfil faster when the stream on data coming and program does'nt know full set of inputs. In order to have optimized bouquets output, Algo created the set of _Requirement_ from all the bouquets which categorized by size and type of the flowers and the list of _Bouquets_ which has these types. This _Requirement_ help to keep track of number of flowers needed for each type and size plus make deceision on which _bouquet_ should receive _flower_ input at each point of time. 

For first round of distributing flowers, if first bouquetin loop needs input flower type it will receive the  _flower_ and then update _requirement_ for next round decision by checking the remaining required of each flower type and set the selected bouquets for next round, So program predict which bouquets should receive the next flower type before the flower come over form input.

The other challenge is to handle situation which the number of flower in bouquets is more than sum of the each flower types in bouquet. for handling this challenge, program create the anothe dummy type which same name of bouquet name and set different amount of flower as quantity. So if the Requirements selected this particular bouquet and the type of input flower is not same as type of flower required in this particular bouquet then push flower to this bouquet to make it ready faster. 

Algo keep track of number of input and if is more than 256 it will return process. Also Algo uses queue as the speed of input is higher than passing flowers to bouquets using eventmiter to pop the input from queue.   

This code tried use OOP to easier implement the logic and also possible to extend. 

###TO DO
This logic still can be improve for first round of selection using some probabilities technique

License
----

MIT
