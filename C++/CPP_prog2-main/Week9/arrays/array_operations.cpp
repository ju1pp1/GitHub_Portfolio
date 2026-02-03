#include "array_operations.hh"
#include <iostream>
int greatest_v1(int *itemptr, int size)
{
    return *(itemptr + size - 1);
    /*
    int* taulukko_osoitin = nullptr;
    taulukko_osoitin = itemptr;
    while (taulukko_osoitin < itemptr + size)
    {
        //std::cout << *taulukko_osoitin << " ";
        ++taulukko_osoitin;
    }
    //std::cout << *(itemptr + 29);
    //std::cout << "\n";

    return *(itemptr + 29); */
}

int greatest_v2(int *itemptr, int *endptr)
{
    int *maxptr = itemptr;
    while(++itemptr < endptr)
    {
        if(*itemptr > *maxptr)
        {
            maxptr = itemptr;
        }
    }
    return *maxptr;
}

void copy(int *itemptr, int *endptr, int *targetptr)
{
    while(itemptr < endptr)
    {
        *targetptr = *itemptr;
        ++itemptr;
        ++targetptr;
    }
}

void reverse(int *leftptr, int *rightptr)
{
    while (leftptr < rightptr)
    {
        int temp = *leftptr;
        *leftptr = *rightptr;
        *rightptr = temp;

        ++leftptr;
        --rightptr;
    }
}
