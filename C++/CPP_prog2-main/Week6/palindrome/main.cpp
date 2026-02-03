#include <iostream>
#include <string>

#ifndef RECURSIVE_FUNC
#define RECURSIVE_FUNC
#endif

bool palindrome_recursive(std::string s)
{
  RECURSIVE_FUNC
  // Do not remove RECURSIVE_FUNC declaration, it's necessary for automatic testing to work
  // ------------


  // Add your implementation here
  int len = s.length();
  std::string first = s.substr(0,1);
  std::string last = s.substr((len - 1),1);

  if(first == last)
  {
      s = s.substr((0 + 1), (len - 2));
      //std::cout << s << " " << s.length() << std::endl;
      if(s.length() <= 1) return true;
      return palindrome_recursive(s);
  }
  else
  {
      return false;
  }


}

// Do not modify rest of the code, or the automated testing won't work.
#ifndef UNIT_TESTING
int main()
{
    std::cout << "Enter a word: ";
    std::string word;
    std::cin >> word;

    if(palindrome_recursive(word)){
        std::cout << word << " is a palindrome" << std::endl;
    } else {
        std::cout << word << " is not a palindrome" << std::endl;
    }
}
#endif
