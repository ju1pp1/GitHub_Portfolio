using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Personi
{
    class Program 
    {
    
        static void Main(string[] args)
        {
           
            PersonPlus pp = new PersonPlus();
            pp.Name = "Jorma Kuusinen";
            pp.Age = 19;
           

            MyPersonList persoona = new MyPersonList();
            persoona.Add(pp);

            Console.WriteLine(persoona.ToString());

            Console.WriteLine(pp.Tulosta());
            Console.WriteLine("Jorma Kuusinen on vuoden päästä: " +pp.IkäEnsiVuonna());
            

        }
        
    }
}