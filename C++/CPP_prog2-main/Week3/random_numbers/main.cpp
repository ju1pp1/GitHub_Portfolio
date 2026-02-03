#include <iostream>
#include <random>
#include <string>

using namespace std;

void produce_random_numbers(unsigned int lower, unsigned int upper)
{
    char c;
    // Implement your function here
    unsigned int seed;
    cout << "Enter a seed value: ";
    cin >> seed;
    cout << endl;
    default_random_engine gen(seed);
    uniform_int_distribution<int> distr(lower, upper);
    //std::cout << distr(gen) << std::endl;
    //cout << distr << endl;
    //cout << distr(gen) << endl;
    for(unsigned int i = 1; i <= upper; i++){
    cout << "Your drawn random number is " << distr(gen) << endl;
    cout << "Press q to quit or any other key to continue: ";
    cin >> c;
    cout << endl;

    if (c == 'q'){
        return;
    }
    }


}

int main()
{
    unsigned int lower_bound, upper_bound;
    cout << "Enter a lower bound: ";
    cin >> lower_bound;
    cout << "Enter an upper bound: ";
    cin >> upper_bound;

    if(lower_bound >= upper_bound)
    {
        cout << "The upper bound must be strictly greater than the lower bound"
             << endl;
        return EXIT_FAILURE;
    }


    produce_random_numbers(lower_bound, upper_bound);

    return EXIT_SUCCESS;
}
