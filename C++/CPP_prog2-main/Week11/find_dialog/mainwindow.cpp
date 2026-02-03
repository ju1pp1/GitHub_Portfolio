#include "mainwindow.hh"
#include "ui_mainwindow.h"
#include <iostream>
#include <fstream>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    connect(ui->closePushButton, &QPushButton::clicked, this, &MainWindow::onCloseButtonClick);
    connect(ui->findPushButton, &QPushButton::clicked, this, &MainWindow::onFindButtonClick);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::onCloseButtonClick()
{
    close();
}

void MainWindow::onFindButtonClick()
{
    QString findFromFileText = ui->fileLineEdit->text();
    QString findWhatFromText = ui->keyLineEdit->text();


    std::string find_file = findFromFileText.toStdString();
    //std::cout << find_file << std::endl;
    std::ifstream file(find_file);
    if(!file)
    {
        //std::cout << "Error" << std::endl;
        ui->textBrowser->setText(tr("File not found"));
    }
    else {
        //std::cout << "Found file" << std::endl;
        //ui->textBrowser->setText(tr("File found"));
        if(findWhatFromText.isEmpty())
        {
            ui->textBrowser->setText(tr("File found"));
        }
        else {

            std::string wordToFind = findWhatFromText.toStdString();
            std::string word;
            bool found = false;

            while(file >> word)
            {
                std::transform(word.begin(), word.end(), word.begin(), ::tolower);
                std::transform(wordToFind.begin(), wordToFind.end(), wordToFind.begin(), ::tolower);

                if(word == wordToFind)
                {
                    found = true;
                    break;
                }
            }
            file.close();
            if(found)
            {
                std::cout << "Word found: " << wordToFind << std::endl;
                ui->textBrowser->setText(tr("Word found"));
            }
            else
            {
                ui->textBrowser->setText(tr("Word not found"));
            }
        }
    }
}


void MainWindow::on_fileLineEdit_editingFinished()
{

}

/*
void MainWindow::on_matchCheckBox_toggled(bool checked)
{

} */

