using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kotitehtava2
{
    class Program
    {
        static void Main(string[] args)
        {
            Tervehdys tervehdys = new Tervehdys("moro!");
            tervehdys.AsetaTervehdys ("moroo");

            Tervehdys uusiTervehdys = new Tervehdys("moi");
            uusiTervehdys.AsetaTervehdys("moii");

            Tulosta(tervehdys);
            Tulosta(uusiTervehdys);
            Console.ReadLine();
       }
        private static void Tulosta(Tervehdys tervehdys)
        {
            Console.WriteLine(tervehdys.HaeTervehdys());
        }
   
    }
}
