/* Class Project
 * ----------
 * COMP.CS.110 FALL 2023
 * ----------
 * Class for describing a project in an IT company.
 *
 * Note: Students need to implement almost all of this class by themselves.
 * */
#ifndef PROJECT_HH
#define PROJECT_HH

#include "employee.hh"
#include "date.hh"
#include "utils.hh"
#include <string>

const std::string NOT_QUALIFIED = "Not qualified any more: ";

class Project
{
public:
    /**
     * @brief Project constructor
     * @param : id
     * @param : start (given as string ddmmyyyy)
     */
    Project(const std::string& id, const std::string& start);

    /**
     * @brief Project constructor
     * @param : id
     * @param : start (given as Date object)
     */
    Project(const std::string& id, const Date& start);

    /**
     * @brief Project destructor
     */
    ~Project();

    // More public methods
    void close(const Date& end);
    bool is_closed() const;
    std::string get_id() const {return id_;}
    Date get_start_date() const {return start_;}
    Date get_end_date() const {return end_;}
    //Print funktio
    bool has_requirement(const std::string& requirement) const;
    void add_requirement(const std::string& requirement);
    const std::set<std::string>& get_requirements() const;
    void assign_employee(Employee* employee);
    const std::set<Employee*>& get_assigned_employees() const;
    bool is_employee_assigned( Employee* employee) const;

private:
    /**
     * @brief obvious attributes
     */
    std::string id_; // Can be a name or any other identifier
    Date start_;
    Date end_;

    // More attributes and private methods
    bool closed_;
    std::set<std::string> requirements_;
    std::set<Employee*> assigned_employees_;
};

#endif // PROJECT_HH
