using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OlioLista
{
    class Piste
    {
        int x;
        int y;

        public void AsetaXY(int xx, int yy)
        {
            x = xx;
            y = yy;
        }

        public string AnnaKoordinaatit()
        {
            return "(" + x + ", " + y + ")";
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            List<Piste> lista = new List<Piste>();
            Piste piste = new Piste();
            piste.AsetaXY(2, 4);
            lista.Add(piste);

            Piste piste2 = new Piste();
            piste2.AsetaXY(5, 3);
            lista.Add(piste2);

            Piste piste3 = new Piste();
            piste3.AsetaXY(2, 1);
            lista.Add(piste3);

            Piste piste4 = new Piste();
            piste4.AsetaXY(5, 6);
            lista.Add(piste4);

            for (int i = 0; i < lista.Count; i++)
            {
                Console.WriteLine(lista[i].AnnaKoordinaatit());
            }
            
        }
    }
}
