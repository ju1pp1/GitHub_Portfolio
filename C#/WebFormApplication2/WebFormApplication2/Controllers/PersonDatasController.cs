using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebFormApplication2.Data;
using WebFormApplication2.Models;
using System.Configuration;

namespace WebFormApplication2.Controllers
{
    public class PersonDatasController : Controller
    {
        private readonly WebFormApplication2Context _context;
        

        public PersonDatasController(WebFormApplication2Context context)
        {
            _context = context;
        }

        // GET: PersonDatas
        public async Task<IActionResult> Index()
        {
              return _context.PersonData != null ? 
                          View(await _context.PersonData.ToListAsync()) :
                          Problem("Entity set 'WebFormApplication2Context.PersonData'  is null.");
        }


        // GET: PersonDatas/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.PersonData == null)
            {
                return NotFound();
            }

            var personData = await _context.PersonData
                .FirstOrDefaultAsync(m => m.ID == id);
            if (personData == null)
            {
                return NotFound();
            }

            return View(personData);
        }

        // GET: PersonDatas/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: PersonDatas/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Name,Surname,Email,Address,Feedback")] PersonData personData)
        {
            
            if (ModelState.IsValid)
            {
                _context.Add(personData);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(personData);
        }
        

        // GET: PersonDatas/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.PersonData == null)
            {
                return NotFound();
            }

            var personData = await _context.PersonData.FindAsync(id);
            if (personData == null)
            {
                return NotFound();
            }
            return View(personData);
        }

        // POST: PersonDatas/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Name,Surname,Email,Address,Feedback")] PersonData personData)
        {
            if (id != personData.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(personData);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PersonDataExists(personData.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(personData);
        }

        // GET: PersonDatas/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.PersonData == null)
            {
                return NotFound();
            }

            var personData = await _context.PersonData
                .FirstOrDefaultAsync(m => m.ID == id);
            if (personData == null)
            {
                return NotFound();
            }

            return View(personData);
        }

        // POST: PersonDatas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.PersonData == null)
            {
                return Problem("Entity set 'WebFormApplication2Context.PersonData'  is null.");
            }
            var personData = await _context.PersonData.FindAsync(id);
            if (personData != null)
            {
                _context.PersonData.Remove(personData);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PersonDataExists(int id)
        {
          return (_context.PersonData?.Any(e => e.ID == id)).GetValueOrDefault();
        }
        
    }
}
