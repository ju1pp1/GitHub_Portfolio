using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kertausta2
{
    // Luokka voidaan määritellää abstraktiksi, jos halutaan, että sitä käytetään ainoastaan perityn luokan kautta. Tässä on tehty niin
    abstract class Testaaja
    {
        public abstract bool Testaa(); // jos luokassa on abstrakteja metodeita (=tyhjiä), luokkakin on määritettävä abstraktiksi (rivi 10).

        // Esimerkkitoteutus Testaa metodista on alla. Älä kirjoita sitä kuitenkaan tähän luokkaan.
        // Piste p1 = new Piste(3, 4);
        // Piste p2 = new Piste(0, 0);
        // if (p1.Etäisyys(p2) == 5.0) { return true; }
        // else { return false; }
    }
}
