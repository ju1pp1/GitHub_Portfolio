using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TryIt
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                // Character stream reading
                StreamReader reader = File.OpenText("c:\\myfile.txt");
                // kokeile myös C:\\eilöydy\\myfile.txt, "", null,
                string line = reader.ReadLine();
                while (line != null)
                {
                    Console.WriteLine(line);
                    line = reader.ReadLine();
                }
                reader.Close();
            }
            catch (FileNotFoundException e) { Console.WriteLine("Ei tiedostoa"); }
            catch (Exception e)
            {
                Console.WriteLine($"Virhe {e.Message} ");
            }

        }
    }
}
