using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Metodeja
{
    class Program
    {
        static void Main(string[] args)
        {

            TulostaTervehdys("Ohjelma käynnissä");
            // string rivi = LueRivi(); // kutsu Console.Readline -metodia
            Console.WriteLine("Summa on " +(LueNumero() + LueNumero() + LueNumero() ));
            int luku = LaskeSumma(1, 4, 7);
            Console.WriteLine("Summa on" + luku);

        }
        /// Summaa 3 lukua
        
        private static int LaskeSumma(int v1, int v2, int v3)
            
        {
            int luku = v1 + v2 + v3;
            return luku;
        }

        /// <summary>
        /// Lue ja palauta kokonaisluku käyttäjältä
        /// </summary>
        /// <returns>Luettu numero</returns>
        private static int LueNumero()
        {

        TulostaTervehdys("Anna luku: ");
        string rivi = LueRivi();
        int luku = int.Parse(rivi);
        return luku;
        }

        private static string LueRivi()
        {

           return Console.ReadLine();
        }

        private static void TulostaTervehdys(string teksti)
        {
            Console.WriteLine();
        }
    }
}
