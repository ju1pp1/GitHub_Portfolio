using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleInherit
{
    class Program
    {
        static void Main(string[] args)
        {
            // lista, jossa isäluokan tyyppisiä alkioita
            List<Person> lista = new List<Person>();
            
            Person person = new Person("Kyösti","Kallio");
            lista.Add(person);
            
            Staff alainen = new Staff();
            alainen.Etunimi = "Hemmo";
            alainen.Sukunimi = "Työläinen";
            alainen.Palkka = 1234;
            lista.Add(alainen); // HUOMAA TYYPIT: List<Person>
            
            // MUUTA
            Student s = new Student("Juho","Paasikivi");
            s.Opintopisteet = 240;
            lista.Add(s);

          /*  for (int i = 0; i < lista.Count; i++)
            {
                Console.WriteLine(lista[i].Etunimi);
            }*/

            // Jäsenen_tyyppi muuttuja "in" kokoelma
            foreach (Person item in lista)
            {
                Console.WriteLine(item);
            }
            Console.WriteLine( ((Student)lista[2]).Opintopisteet);
            
        }
    }
}
