using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Looppi
{
    class Program
    {
        static void Main(string[] args)
        {
            
            // tulosta luvut 1-10 tai
            // tulosta luvut 90 -> 70, kahden välein
            // i++ tarkoittaa i=i+1 (myös i+=1)
            for (int i = 90; i > 69; i-=2)  // for<TAB><TAB>
            {
                Console.WriteLine(i);
            }
            //Console.WriteLine(i);
        }
    }
}
