using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lista2
{
    class Program
    {
        // pääohhelma
        static void Main(string[] args)
        {
            List<Person> lista = new List<Person>();
            Person pertti = new Person();
            // aseta etunimi ja sukunimi
            pertti.SetFirstName("Pertti");
            pertti.SetLastName("Pasanen");
            lista.Add(pertti);
            // toinen vielä
            lista.Add(new Person("Vertti", "Velmula"));

            for (int i = 0; i < lista.Count; i++)
            {
                Console.WriteLine(lista[i].Tulosta());
            }
        }
    }
}
