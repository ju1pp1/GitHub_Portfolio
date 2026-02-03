using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lista1
{
    class Program
    {
        static void Main(string[] args)
        {
            List<string> lista = new List<string>();

            // TEHT: kysy listan sisällön käyttäjältä Console.ReadLine-metodilla
            Console.WriteLine("Mitkä ovat TOP3 suosikkiasi?");
            for (int i = 0; i < 3; i++)
            {
                lista.Add(Console.ReadLine()); // näitä voi olla monta
            }
            // Muuta siis yo. rivejä

            lista.Sort();
            //lista.Reverse();
            for (int i = 0; i < lista.Count; i++)
            {
                // lista[i] on tyyppiä string
                Console.WriteLine(lista[i].ToUpper());
            }

            // tai for :n sijaan
            // foreach(string s in lista) { Console.WriteLine(s); }
        }
    }
}
