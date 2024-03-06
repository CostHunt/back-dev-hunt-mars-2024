-- CreateTable
CREATE TABLE "Quartier" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nom_quartier" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quartier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "nom" VARCHAR(30) NOT NULL,
    "prenoms" VARCHAR(30) NOT NULL,
    "matricule" VARCHAR(30) NOT NULL,
    "_password" VARCHAR(250),
    "image_profile" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_quartier" UUID NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nom_project" VARCHAR(30) NOT NULL,
    "categorie" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "id_account" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ligne" VARCHAR NOT NULL,
    "date_envoye" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contenu" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_account" UUID NOT NULL,
    "id_groupe" UUID NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(250) NOT NULL,
    "date_publication" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_groupe" UUID NOT NULL,
    "id_account" UUID NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groupe" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nom_groupe" VARCHAR(30) NOT NULL,
    "image_groupe" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Groupe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachedfile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nom_fichier" VARCHAR(30) NOT NULL,
    "url" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_post" UUID NOT NULL,

    CONSTRAINT "Attachedfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contenu" VARCHAR(100) NOT NULL,
    "date_commentaire" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_post" UUID NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BusToQuartier" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Quartier_nom_quartier_key" ON "Quartier"("nom_quartier");

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_matricule_key" ON "Account"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "Bus_ligne_key" ON "Bus"("ligne");

-- CreateIndex
CREATE UNIQUE INDEX "Groupe_nom_groupe_key" ON "Groupe"("nom_groupe");

-- CreateIndex
CREATE UNIQUE INDEX "_BusToQuartier_AB_unique" ON "_BusToQuartier"("A", "B");

-- CreateIndex
CREATE INDEX "_BusToQuartier_B_index" ON "_BusToQuartier"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_id_quartier_fkey" FOREIGN KEY ("id_quartier") REFERENCES "Quartier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_groupe_fkey" FOREIGN KEY ("id_groupe") REFERENCES "Groupe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_groupe_fkey" FOREIGN KEY ("id_groupe") REFERENCES "Groupe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachedfile" ADD CONSTRAINT "Attachedfile_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusToQuartier" ADD CONSTRAINT "_BusToQuartier_A_fkey" FOREIGN KEY ("A") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusToQuartier" ADD CONSTRAINT "_BusToQuartier_B_fkey" FOREIGN KEY ("B") REFERENCES "Quartier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
