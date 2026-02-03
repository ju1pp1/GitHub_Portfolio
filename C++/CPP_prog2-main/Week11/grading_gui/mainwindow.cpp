#include "gradecalculator.hh"
#include "mainwindow.hh"
#include "ui_mainwindow.h"


MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    ui->spinBoxN->setRange(0, 800);
    ui->spinBoxG->setRange(0, 120);
    ui->spinBoxP->setRange(0, 250);
    ui->spinBoxE->setRange(0, 5);

    connect(ui->calculatePushButton, &QPushButton::clicked, this, &MainWindow::onCalculateButtonClicked);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::onCalculateButtonClicked()
{
    int n_points = ui->spinBoxN->value();
    int g_points = ui->spinBoxG->value();
    int p_points = ui->spinBoxP->value();
    int e_points = ui->spinBoxE->value();

    unsigned int w_score = score_from_weekly_exercises(n_points, g_points);
    unsigned int p_score = score_from_projects(p_points);
    unsigned int total_grade = calculate_total_grade(n_points, g_points, p_points, e_points);

    ui->textBrowser->clear();
    ui->textBrowser->append("W-Score: " + QString::number(w_score));
    ui->textBrowser->append("P-Score: " + QString::number(p_score));
    ui->textBrowser->append("Total grade: " + QString::number(total_grade));

}

