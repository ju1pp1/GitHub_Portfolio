using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kertausta2
{
    class LevPit : Piste
    {
        public LevPit(double x, double y): base(x, y)
        {
            
        }
        // TEHT: tee 2 parametrinen muodostin, joka hyväksyy vain x:n ja y:n arvot -180 ...180
        // kutsu isäluokan muodostinta: base(x,y) kuten alla mallina olevassa parametrittömässä muodostimessa
        public LevPit(): base(0,0)
        {
            
        }

        public override double Etäisyys(Piste p)
        {
            return base.Etäisyys(p);
                double pi180 = Math.PI / 180.0;
                return Math.Acos(Math.Sin(y * pi180) * Math.Sin(p.y * pi180) + Math.Cos(y * pi180) * Math.Cos(p.y * pi180) * Math.Cos(p.x * pi180 - x * pi180)) * 6371000;
            
        }



        // korvaa Etäisyys-metodi käyttämään seuraavia 2 riviä
        //    double pi180 = Math.PI / 180.0;
        //    return Math.Acos(Math.Sin(y* pi180) * Math.Sin(p.y* pi180) + Math.Cos(y* pi180) * Math.Cos(p.y* pi180) * Math.Cos(p.x* pi180 - x* pi180)) * 6371000;

        // muista lisätä Piste-luokassa Etäisyys-metodin eteen "virtual", jotta korvaaminen onnistuisi
    }
}
