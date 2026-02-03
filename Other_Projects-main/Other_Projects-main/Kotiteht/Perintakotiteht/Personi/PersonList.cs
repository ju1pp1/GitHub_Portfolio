using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Personi
{
    public class PersonList
    {

        protected List<PersonPlus> personList = new List<PersonPlus>();

        public virtual void Add(PersonPlus person)
        {
            personList.Add(person);
        }

        public virtual PersonPlus GetAt(int index)
        {
            // jos listan indeksi kuuluu listaan
            if (index >= 0 && index < personList.Count)
            {
                return personList[index];
            }
            else
            {
                return null; // tyhjä
            }

        }
    }
}