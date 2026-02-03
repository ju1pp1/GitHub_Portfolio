using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LueTeksti1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Kirjoita lause");
            string teksti = Console.ReadLine();
            Console.WriteLine("Toinen sana oli" + teksti.Split(' ')[1]);
            if (teksti.ToLower().Contains("minä"))
                Console.WriteLine("Tykkäät puhua itsestäsi..");
        }
                if (teksti.ToLower().Contains("en")) 
            {

    
        }
    }
}
